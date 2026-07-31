const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

// DATA_DIR lets a host (e.g. Render persistent disk) keep the database outside
// the app folder so data survives redeploys. Falls back to the app folder locally.
const DATA_DIR = process.env.DATA_DIR || __dirname;
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const DB_PATH = path.join(DATA_DIR, 'data.sqlite');

// On first boot with no database yet, start from the committed seed (278 tests,
// logo, settings) so a fresh deploy is fully populated.
const SEED_PATH = path.join(__dirname, 'seed.sqlite');
if (!fs.existsSync(DB_PATH) && fs.existsSync(SEED_PATH)) {
  fs.copyFileSync(SEED_PATH, DB_PATH);
}

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS tests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name_en TEXT NOT NULL,
  name_hi TEXT DEFAULT '',
  category TEXT DEFAULT 'Blood Test',
  rate INTEGER,
  show_rate INTEGER DEFAULT 0,
  active INTEGER DEFAULT 1
);
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  tests TEXT NOT NULL,
  date TEXT NOT NULL,
  notes TEXT DEFAULT '',
  status TEXT DEFAULT 'new',
  created_at TEXT DEFAULT (datetime('now','localtime'))
);
CREATE TABLE IF NOT EXISTS collections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  tests TEXT NOT NULL,
  date TEXT NOT NULL,
  notes TEXT DEFAULT '',
  status TEXT DEFAULT 'new',
  created_at TEXT DEFAULT (datetime('now','localtime'))
);
CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  code TEXT NOT NULL,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now','localtime'))
);
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);
CREATE TABLE IF NOT EXISTS photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT NOT NULL,
  caption TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now','localtime'))
);
`);

// Seed default admin (username: admin, password: shlok@123) — change after first login
const adminCount = db.prepare('SELECT COUNT(*) c FROM admins').get().c;
if (adminCount === 0) {
  db.prepare('INSERT INTO admins (username, password_hash) VALUES (?, ?)')
    .run('admin', bcrypt.hashSync('shlok@123', 10));
}

const defaults = {
  upi_id: '',
  whatsapp: '917905010042',
  phone: '7905010042',
  email: 'shlok2021pathlabs@gmail.com',
  address: 'Banthara Sikandar Pur, Lucknow, Uttar Pradesh',
  timing_en: 'Open All Days: 6:00 AM - 9:00 PM (Sunday Open)',
  timing_hi: 'Roz khula: Subah 6 baje - Raat 9 baje (Sunday bhi khula)',
  reg_no: 'RMEE2445935',
  home_collection_charge: 'Extra charge applicable'
};
const insSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
for (const [k, v] of Object.entries(defaults)) insSetting.run(k, v);

// Seed common tests if empty
const testCount = db.prepare('SELECT COUNT(*) c FROM tests').get().c;
if (testCount === 0) {
  const seed = [
    ['CBC (Complete Blood Count)', 'CBC (पूर्ण रक्त जांच)', 'Blood Test'],
    ['Blood Sugar (Fasting / PP / Random)', 'ब्लड शुगर (खाली पेट / खाने के बाद)', 'Blood Test'],
    ['HbA1c (Diabetes Test)', 'HbA1c (मधुमेह जांच)', 'Blood Test'],
    ['Thyroid Profile (T3, T4, TSH)', 'थायराइड प्रोफाइल (T3, T4, TSH)', 'Blood Test'],
    ['Lipid Profile (Cholesterol)', 'लिपिड प्रोफाइल (कोलेस्ट्रॉल)', 'Blood Test'],
    ['LFT (Liver Function Test)', 'LFT (लीवर की जांच)', 'Blood Test'],
    ['KFT (Kidney Function Test)', 'KFT (किडनी की जांच)', 'Blood Test'],
    ['Vitamin D', 'विटामिन D', 'Blood Test'],
    ['Vitamin B12', 'विटामिन B12', 'Blood Test'],
    ['Urine Routine Examination', 'यूरिन जांच', 'Urine Test'],
    ['Widal Test (Typhoid)', 'विडाल टेस्ट (टाइफाइड)', 'Blood Test'],
    ['Malaria Test (MP)', 'मलेरिया जांच', 'Blood Test'],
    ['Dengue Test (NS1 / IgG / IgM)', 'डेंगू जांच', 'Blood Test'],
    ['Pregnancy Test (UPT / Beta hCG)', 'गर्भावस्था जांच', 'Blood Test'],
    ['Hemoglobin (Hb)', 'हीमोग्लोबिन', 'Blood Test'],
    ['ESR', 'ESR', 'Blood Test'],
    ['CRP', 'CRP', 'Blood Test'],
    ['Uric Acid', 'यूरिक एसिड', 'Blood Test'],
    ['Full Body Health Checkup', 'फुल बॉडी हेल्थ चेकअप', 'Health Package'],
    ['Fever Panel', 'बुखार पैनल', 'Health Package'],
    ['Chest X-Ray (Digital)', 'छाती का एक्स-रे (डिजिटल)', 'Digital X-Ray'],
    ['Knee X-Ray (Digital)', 'घुटने का एक्स-रे (डिजिटल)', 'Digital X-Ray'],
    ['Spine X-Ray (Digital)', 'रीढ़ का एक्स-रे (डिजिटल)', 'Digital X-Ray'],
    ['Abdomen X-Ray (Digital)', 'पेट का एक्स-रे (डिजिटल)', 'Digital X-Ray'],
    ['Skull / Sinus X-Ray (Digital)', 'सिर / साइनस एक्स-रे (डिजिटल)', 'Digital X-Ray'],
    ['ECG', 'ECG (दिल की जांच)', 'Other']
  ];
  const ins = db.prepare('INSERT INTO tests (name_en, name_hi, category) VALUES (?, ?, ?)');
  for (const t of seed) ins.run(t[0], t[1], t[2]);
}

module.exports = db;
