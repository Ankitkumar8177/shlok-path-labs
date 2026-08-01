const express = require('express');
const session = require('express-session');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Email OTP setup ----------
// Configure via env vars (set these on Render): SMTP_USER + SMTP_PASS (a Gmail
// App Password). Optional SMTP_HOST/SMTP_PORT for a non-Gmail provider.
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
let mailer = null;
if (SMTP_USER && SMTP_PASS) {
  mailer = nodemailer.createTransport(
    process.env.SMTP_HOST
      ? { host: process.env.SMTP_HOST, port: parseInt(process.env.SMTP_PORT || '587'), secure: parseInt(process.env.SMTP_PORT || '587') === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } }
      : { service: 'gmail', auth: { user: SMTP_USER, pass: SMTP_PASS } }
  );
}
// In-memory OTP store: email -> { code, expires, tries }
const otpStore = new Map();
const OTP_TTL_MS = 10 * 60 * 1000;   // 10 minutes
const OTP_RESEND_MS = 60 * 1000;     // min 60s between sends
const otpLastSent = new Map();
function authorizedEmails() {
  const raw = (db.prepare("SELECT value FROM settings WHERE key='admin_email'").get() || {}).value
    || (db.prepare("SELECT value FROM settings WHERE key='email'").get() || {}).value || '';
  return raw.split(',').map(e => e.trim().toLowerCase()).filter(Boolean);
}
function maskEmail(e) {
  const [u, d] = String(e).split('@');
  if (!d) return e;
  const shown = u.slice(0, Math.min(3, u.length));
  return shown + '*'.repeat(Math.max(2, u.length - shown.length)) + '@' + d;
}

// Report files live under DATA_DIR so they persist on a host with a mounted disk.
const DATA_DIR = process.env.DATA_DIR || __dirname;
const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 8 }
}));
// Clean URLs: redirect /page.html -> /page (and /index.html -> /), preserving query string
app.use((req, res, next) => {
  if (req.path.length > 5 && req.path.endsWith('.html')) {
    const clean = req.path.slice(0, -5);
    const qs = req.originalUrl.slice(req.path.length);
    return res.redirect(301, (clean === '/index' ? '/' : clean) + qs);
  }
  next();
});
// Serve pages without the .html extension (e.g. /collection -> collection.html)
app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));

// ---------- helpers ----------
const cleanPhone = p => String(p || '').replace(/\D/g, '').slice(-10);
const getSetting = k => (db.prepare('SELECT value FROM settings WHERE key=?').get(k) || {}).value || '';
const requireAdmin = (req, res, next) => {
  if (req.session && req.session.admin) return next();
  if (req.path.startsWith('/api')) return res.status(401).json({ error: 'unauthorized' });
  res.redirect('/admin/login');
};

// ---------- public APIs ----------
app.get('/api/tests', (req, res) => {
  const rows = db.prepare('SELECT id, name_en, name_hi, category, rate, show_rate FROM tests WHERE active=1 ORDER BY category, name_en').all();
  res.json(rows.map(t => ({
    id: t.id, name_en: t.name_en, name_hi: t.name_hi, category: t.category,
    rate: t.show_rate ? t.rate : null
  })));
});

app.get('/api/public-settings', (req, res) => {
  res.json({
    upi_id: getSetting('upi_id'),
    whatsapp: getSetting('whatsapp'),
    phone: getSetting('phone'),
    email: getSetting('email'),
    address: getSetting('address'),
    timing_en: getSetting('timing_en'),
    timing_hi: getSetting('timing_hi'),
    reg_no: getSetting('reg_no')
  });
});

app.post('/api/book', (req, res) => {
  const { name, phone, tests, date, notes } = req.body;
  if (!name || !cleanPhone(phone) || !tests || !date) return res.status(400).json({ error: 'missing' });
  const r = db.prepare('INSERT INTO bookings (name, phone, tests, date, notes) VALUES (?,?,?,?,?)')
    .run(String(name).slice(0, 100), cleanPhone(phone), String(tests).slice(0, 1000), String(date).slice(0, 20), String(notes || '').slice(0, 500));
  res.json({ ok: true, id: r.lastInsertRowid, upi_id: getSetting('upi_id'), whatsapp: getSetting('whatsapp') });
});

app.post('/api/collection', (req, res) => {
  const { name, phone, address, tests, date, notes } = req.body;
  if (!name || !cleanPhone(phone) || !address || !tests || !date) return res.status(400).json({ error: 'missing' });
  const r = db.prepare('INSERT INTO collections (name, phone, address, tests, date, notes) VALUES (?,?,?,?,?,?)')
    .run(String(name).slice(0, 100), cleanPhone(phone), String(address).slice(0, 300), String(tests).slice(0, 1000), String(date).slice(0, 20), String(notes || '').slice(0, 500));
  res.json({ ok: true, id: r.lastInsertRowid, whatsapp: getSetting('whatsapp') });
});

// Mobile number is the strict key (must match exactly). Name is only a soft
// filter to narrow results — a small spelling mistake in the name is tolerated.
app.post('/api/report-find', (req, res) => {
  const phone = cleanPhone(req.body.phone);
  const name = String(req.body.name || '').trim();
  if (!phone) return res.status(400).json({ error: 'missing' });
  const all = db.prepare('SELECT id, patient_name, original_name, created_at FROM reports WHERE phone=? ORDER BY id DESC').all(phone);
  const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const nn = norm(name);
  let rows = all;
  if (nn) {
    const matched = all.filter(r => { const rn = norm(r.patient_name); return rn && (rn.includes(nn) || nn.includes(rn)); });
    if (matched.length) rows = matched; // exact-ish name match narrows; otherwise show all for this phone
  }
  res.json({ reports: rows });
});

app.get('/api/report-download/:id', (req, res) => {
  const phone = cleanPhone(req.query.phone);
  const row = db.prepare('SELECT * FROM reports WHERE id=? AND phone=?').get(req.params.id, phone);
  if (!row) return res.status(404).send('Report not found');
  res.download(path.join(UPLOAD_DIR, row.filename), row.original_name);
});

// ---------- admin auth ----------
app.get('/admin', (req, res) => res.redirect(req.session.admin ? '/admin/dashboard' : '/admin/login'));
app.get('/admin/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin-login.html')));
app.get('/admin/dashboard', requireAdmin, (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin-dashboard.html')));

app.post('/admin/api/login', (req, res) => {
  const { username, password } = req.body;
  const row = db.prepare('SELECT * FROM admins WHERE username=?').get(String(username || '').trim());
  if (!row || !bcrypt.compareSync(String(password || ''), row.password_hash)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  req.session.admin = row.username;
  res.json({ ok: true });
});
app.post('/admin/api/logout', (req, res) => { req.session.destroy(() => res.json({ ok: true })); });

// ---- Email OTP login ----
// Tells the login page whether OTP is available and which (masked) email it goes to.
app.get('/admin/api/otp-info', (req, res) => {
  const emails = authorizedEmails();
  const available = !!mailer || process.env.OTP_DEV_ECHO === '1';
  res.json({ enabled: available && emails.length > 0, email_masked: emails[0] ? maskEmail(emails[0]) : '' });
});

app.post('/admin/api/send-otp', async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  if (!authorizedEmails().includes(email)) {
    return res.status(403).json({ error: 'This email is not authorized for admin login.' });
  }
  // OTP_DEV_ECHO=1 is for LOCAL TESTING ONLY (prints OTP to server console, no email).
  // NEVER set it on Render / production.
  const devEcho = process.env.OTP_DEV_ECHO === '1';
  if (!mailer && !devEcho) return res.status(503).json({ error: 'Email login is not set up yet. Please log in with password.' });
  const last = otpLastSent.get(email) || 0;
  if (Date.now() - last < OTP_RESEND_MS) {
    return res.status(429).json({ error: 'Please wait a minute before requesting another OTP.' });
  }
  const code = ('' + Math.floor(100000 + Math.random() * 900000));
  otpStore.set(email, { code, expires: Date.now() + OTP_TTL_MS, tries: 0 });
  otpLastSent.set(email, Date.now());
  if (!mailer && devEcho) { console.log(`[DEV OTP] ${email} -> ${code}`); return res.json({ ok: true }); }
  try {
    await mailer.sendMail({
      from: `"Shlok Path Labs" <${SMTP_USER}>`,
      to: email,
      subject: `Your admin login OTP: ${code}`,
      text: `Your Shlok Path Labs admin login OTP is: ${code}\n\nIt is valid for 10 minutes. If you did not request this, ignore this email.`,
      html: `<div style="font-family:Arial,sans-serif;max-width:420px;margin:auto;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden">
        <div style="background:#0b6e4f;color:#fff;padding:16px 20px;font-size:17px;font-weight:bold">🔬 Shlok Path Labs — Admin Login</div>
        <div style="padding:22px 20px;color:#222">
          <p style="margin:0 0 10px">Your one-time password (OTP) is:</p>
          <div style="font-size:32px;font-weight:bold;letter-spacing:6px;color:#0b6e4f;text-align:center;margin:14px 0">${code}</div>
          <p style="color:#777;font-size:13px;margin:10px 0 0">Valid for 10 minutes. If you did not request this, please ignore this email.</p>
        </div></div>`
    });
    res.json({ ok: true });
  } catch (e) {
    otpStore.delete(email);
    res.status(500).json({ error: 'Could not send email. Check email setup, or use password login.' });
  }
});

app.post('/admin/api/verify-otp', (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const code = String(req.body.otp || '').trim();
  const rec = otpStore.get(email);
  if (!rec || rec.expires < Date.now()) { otpStore.delete(email); return res.status(400).json({ error: 'OTP expired. Please request a new one.' }); }
  if (rec.tries >= 5) { otpStore.delete(email); return res.status(429).json({ error: 'Too many wrong attempts. Please request a new OTP.' }); }
  if (rec.code !== code) { rec.tries++; return res.status(401).json({ error: 'Wrong OTP. Please try again.' }); }
  otpStore.delete(email);
  const admin = db.prepare('SELECT username FROM admins LIMIT 1').get();
  req.session.admin = admin ? admin.username : 'admin';
  res.json({ ok: true });
});
app.post('/admin/api/change-password', requireAdmin, (req, res) => {
  const { old_password, new_password } = req.body;
  const row = db.prepare('SELECT * FROM admins WHERE username=?').get(req.session.admin);
  if (!bcrypt.compareSync(String(old_password || ''), row.password_hash)) return res.status(400).json({ error: 'Old password is incorrect' });
  if (String(new_password || '').length < 6) return res.status(400).json({ error: 'New password must be at least 6 characters' });
  db.prepare('UPDATE admins SET password_hash=? WHERE username=?').run(bcrypt.hashSync(new_password, 10), req.session.admin);
  res.json({ ok: true });
});

// ---------- admin: bookings & collections ----------
app.get('/admin/api/bookings', requireAdmin, (req, res) => {
  res.json(db.prepare('SELECT * FROM bookings ORDER BY id DESC LIMIT 500').all());
});
app.patch('/admin/api/bookings/:id', requireAdmin, (req, res) => {
  db.prepare('UPDATE bookings SET status=? WHERE id=?').run(String(req.body.status || 'new'), req.params.id);
  res.json({ ok: true });
});
app.get('/admin/api/collections', requireAdmin, (req, res) => {
  res.json(db.prepare('SELECT * FROM collections ORDER BY id DESC LIMIT 500').all());
});
app.patch('/admin/api/collections/:id', requireAdmin, (req, res) => {
  db.prepare('UPDATE collections SET status=? WHERE id=?').run(String(req.body.status || 'new'), req.params.id);
  res.json({ ok: true });
});

// ---------- admin: tests ----------
app.get('/admin/api/tests', requireAdmin, (req, res) => {
  res.json(db.prepare('SELECT * FROM tests ORDER BY category, name_en').all());
});
app.post('/admin/api/tests', requireAdmin, (req, res) => {
  const { name_en, name_hi, category, rate, show_rate } = req.body;
  if (!name_en) return res.status(400).json({ error: 'missing name' });
  db.prepare('INSERT INTO tests (name_en, name_hi, category, rate, show_rate) VALUES (?,?,?,?,?)')
    .run(name_en, name_hi || '', category || 'Blood Test', rate ? parseInt(rate) : null, show_rate ? 1 : 0);
  res.json({ ok: true });
});
app.patch('/admin/api/tests/:id', requireAdmin, (req, res) => {
  const t = db.prepare('SELECT * FROM tests WHERE id=?').get(req.params.id);
  if (!t) return res.status(404).json({ error: 'not found' });
  const b = req.body;
  db.prepare('UPDATE tests SET name_en=?, name_hi=?, category=?, rate=?, show_rate=?, active=? WHERE id=?')
    .run(b.name_en ?? t.name_en, b.name_hi ?? t.name_hi, b.category ?? t.category,
         b.rate !== undefined ? (b.rate ? parseInt(b.rate) : null) : t.rate,
         b.show_rate !== undefined ? (b.show_rate ? 1 : 0) : t.show_rate,
         b.active !== undefined ? (b.active ? 1 : 0) : t.active, req.params.id);
  res.json({ ok: true });
});
app.delete('/admin/api/tests/:id', requireAdmin, (req, res) => {
  db.prepare('DELETE FROM tests WHERE id=?').run(req.params.id);
  res.json({ ok: true });
});

// ---------- admin: reports upload ----------
const storage = multer.diskStorage({
  destination: UPLOAD_DIR,
  filename: (req, file, cb) => cb(null, Date.now() + '-' + crypto.randomBytes(4).toString('hex') + path.extname(file.originalname).toLowerCase())
});
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = ['.pdf', '.jpg', '.jpeg', '.png'].includes(path.extname(file.originalname).toLowerCase());
    cb(ok ? null : new Error('Only PDF/JPG/PNG files are allowed'), ok);
  }
});

app.post('/admin/api/reports', requireAdmin, upload.single('file'), (req, res) => {
  const { patient_name, phone } = req.body;
  if (!req.file || !patient_name || !cleanPhone(phone)) return res.status(400).json({ error: 'missing' });
  const code = crypto.randomBytes(3).toString('hex').toUpperCase();
  db.prepare('INSERT INTO reports (patient_name, phone, code, filename, original_name) VALUES (?,?,?,?,?)')
    .run(String(patient_name).slice(0, 100), cleanPhone(phone), code, req.file.filename, req.file.originalname);
  res.json({ ok: true, code });
});
app.get('/admin/api/reports', requireAdmin, (req, res) => {
  res.json(db.prepare('SELECT * FROM reports ORDER BY id DESC LIMIT 500').all());
});
app.delete('/admin/api/reports/:id', requireAdmin, (req, res) => {
  const row = db.prepare('SELECT * FROM reports WHERE id=?').get(req.params.id);
  if (row) {
    try { fs.unlinkSync(path.join(UPLOAD_DIR, row.filename)); } catch (e) {}
    db.prepare('DELETE FROM reports WHERE id=?').run(req.params.id);
  }
  res.json({ ok: true });
});

// ---------- photos ----------
const IMG_DIR = path.join(__dirname, 'public', 'img');
if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

// Fixed photo slots used by the site layout; gallery photos are unlimited
const SLOT_FILES = { hero: 'lab.jpg', logo: 'logo.png', doctor1: 'doc1.jpg', doctor2: 'doc2.jpg' };

const photoStorage = multer.diskStorage({
  destination: IMG_DIR,
  filename: (req, file, cb) => cb(null, 'photo-' + Date.now() + '-' + crypto.randomBytes(3).toString('hex') + path.extname(file.originalname).toLowerCase())
});
const photoUpload = multer({
  storage: photoStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file.originalname).toLowerCase());
    cb(ok ? null : new Error('Only JPG/PNG/WEBP images are allowed'), ok);
  }
});

app.get('/api/photos', (req, res) => {
  const out = {};
  for (const [kind, fname] of Object.entries(SLOT_FILES)) {
    out[kind] = fs.existsSync(path.join(IMG_DIR, fname)) ? '/img/' + fname : null;
  }
  out.gallery = db.prepare('SELECT id, filename, caption FROM photos ORDER BY id DESC').all()
    .map(p => ({ id: p.id, src: '/img/' + p.filename, caption: p.caption }));
  res.json(out);
});

app.post('/admin/api/photos', requireAdmin, photoUpload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const kind = String(req.body.kind || 'gallery');
  if (SLOT_FILES[kind]) {
    const dest = path.join(IMG_DIR, SLOT_FILES[kind]);
    try { fs.unlinkSync(dest); } catch (e) {}
    fs.renameSync(req.file.path, dest);
    return res.json({ ok: true, kind });
  }
  db.prepare('INSERT INTO photos (filename, caption) VALUES (?, ?)')
    .run(req.file.filename, String(req.body.caption || '').slice(0, 200));
  res.json({ ok: true });
});

app.delete('/admin/api/photos/slot/:kind', requireAdmin, (req, res) => {
  const fname = SLOT_FILES[req.params.kind];
  if (!fname) return res.status(404).json({ error: 'Unknown slot' });
  try { fs.unlinkSync(path.join(IMG_DIR, fname)); } catch (e) {}
  res.json({ ok: true });
});

app.delete('/admin/api/photos/:id', requireAdmin, (req, res) => {
  const row = db.prepare('SELECT * FROM photos WHERE id=?').get(req.params.id);
  if (row) {
    try { fs.unlinkSync(path.join(IMG_DIR, row.filename)); } catch (e) {}
    db.prepare('DELETE FROM photos WHERE id=?').run(req.params.id);
  }
  res.json({ ok: true });
});

// ---------- admin: settings ----------
app.get('/admin/api/settings', requireAdmin, (req, res) => {
  const rows = db.prepare('SELECT key, value FROM settings').all();
  res.json(Object.fromEntries(rows.map(r => [r.key, r.value])));
});
app.post('/admin/api/settings', requireAdmin, (req, res) => {
  const allowed = ['upi_id', 'whatsapp', 'phone', 'email', 'address', 'timing_en', 'timing_hi', 'reg_no', 'home_collection_charge', 'admin_email'];
  const up = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value');
  for (const k of allowed) if (req.body[k] !== undefined) up.run(k, String(req.body[k]));
  res.json({ ok: true });
});

app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message || 'error' });
});

app.listen(PORT, () => console.log(`Shlok Path Labs website running: http://localhost:${PORT}`));
