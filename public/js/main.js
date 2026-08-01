/* Shared: header/footer injection + Hindi-English i18n + WhatsApp float */
const I18N = {
  // nav
  nav_home: { en: 'Home', hi: 'होम' },
  nav_tests: { en: 'Tests & Rates', hi: 'जांच व रेट' },
  nav_book: { en: 'Book Test', hi: 'टेस्ट बुक करें' },
  nav_collection: { en: 'Home Collection', hi: 'घर से सैंपल' },
  nav_reports: { en: 'Download Report', hi: 'रिपोर्ट डाउनलोड' },
  nav_admin: { en: 'Admin Login', hi: 'एडमिन लॉगिन' },
  top_timing: { en: '⏰ 6:00 AM – 9:00 PM | Sunday Open', hi: '⏰ सुबह 6 – रात 9 बजे | संडे खुला' },
  top_phone: { en: '📞 7905010042', hi: '📞 7905010042' },
  // hero
  hero_title: { en: 'Accurate Reports. Affordable Rates. Same Day Delivery.', hi: 'सटीक रिपोर्ट। किफायती रेट। उसी दिन रिपोर्ट।' },
  hero_sub: { en: 'MD Pathologists (KGMU & BLDE) • All blood tests • Digital X-Ray • Home sample collection in Banthara, Lucknow', hi: 'MD पैथोलॉजिस्ट (KGMU व BLDE) • सभी ब्लड टेस्ट • डिजिटल एक्स-रे • बंथरा, लखनऊ में घर से सैंपल कलेक्शन' },
  badge1: { en: 'Since 2021', hi: '2021 से' },
  badge2: { en: 'Same Day Report', hi: 'उसी दिन रिपोर्ट' },
  badge3: { en: 'Sunday Open', hi: 'संडे भी खुला' },
  badge4: { en: 'MD Pathologists', hi: 'MD पैथोलॉजिस्ट' },
  cta_book: { en: '🧪 Book a Test', hi: '🧪 टेस्ट बुक करें' },
  cta_call: { en: '📞 Call Now', hi: '📞 अभी कॉल करें' },
  hero_trust1: { en: 'Home Sample Collection', hi: 'घर से सैंपल कलेक्शन' },
  hero_trust2: { en: 'Reports on WhatsApp', hi: 'WhatsApp पर रिपोर्ट' },
  // services
  svc_eyebrow: { en: 'What We Offer', hi: 'हमारी सुविधाएं' },
  svc_title: { en: 'Our Services', hi: 'हमारी सेवाएं' },
  svc_sub: { en: 'Complete pathology & digital X-ray under one roof', hi: 'एक ही जगह पर पूरी पैथोलॉजी और डिजिटल एक्स-रे सुविधा' },
  svc1_t: { en: 'All Blood Tests', hi: 'सभी ब्लड टेस्ट' },
  svc1_p: { en: 'CBC, Sugar, Thyroid, Lipid, LFT, KFT, Vitamins & more', hi: 'CBC, शुगर, थायराइड, लिपिड, LFT, KFT, विटामिन और भी बहुत कुछ' },
  svc2_t: { en: 'Digital X-Ray', hi: 'डिजिटल एक्स-रे' },
  svc2_p: { en: 'Chest, spine, knee, abdomen — clear digital films', hi: 'छाती, रीढ़, घुटना, पेट — साफ डिजिटल फिल्म' },
  svc3_t: { en: 'Home Collection', hi: 'घर से सैंपल' },
  svc3_p: { en: 'Sample collection at your doorstep (nominal charge)', hi: 'आपके घर से सैंपल कलेक्शन (मामूली चार्ज पर)' },
  svc4_t: { en: 'Same Day Report', hi: 'उसी दिन रिपोर्ट' },
  svc4_p: { en: 'Reports on WhatsApp the same day', hi: 'उसी दिन WhatsApp पर रिपोर्ट' },
  // feature showcase
  feat_home_tag: { en: 'AT YOUR DOORSTEP', hi: 'आपके घर पर' },
  feat_home_t: { en: 'Home Sample Collection', hi: 'घर से सैंपल कलेक्शन' },
  feat_home_p: { en: 'Our trained staff visits your home to collect samples — safe, hygienic and convenient for elders and busy families.', hi: 'हमारा प्रशिक्षित स्टाफ सैंपल लेने आपके घर आता है — बुजुर्गों और व्यस्त परिवारों के लिए सुरक्षित और आसान।' },
  feat_home_btn: { en: 'Request Home Visit', hi: 'घर बुलाएं' },
  feat_xray_tag: { en: 'CLEAR DIGITAL FILMS', hi: 'साफ डिजिटल फिल्म' },
  feat_xray_t: { en: 'Digital X-Ray Centre', hi: 'डिजिटल एक्स-रे सेंटर' },
  feat_xray_p: { en: 'Modern digital X-ray for chest, spine, knee, abdomen and more — sharp images, low radiation, quick reports.', hi: 'छाती, रीढ़, घुटना, पेट आदि के लिए आधुनिक डिजिटल एक्स-रे — साफ इमेज, कम रेडिएशन, जल्दी रिपोर्ट।' },
  feat_xray_btn: { en: 'Book X-Ray', hi: 'एक्स-रे बुक करें' },
  // strip
  strip1: { en: 'Years of Trust', hi: 'साल का भरोसा' },
  strip2: { en: 'Tests Available', hi: 'टेस्ट उपलब्ध' },
  strip3: { en: 'Days Open / Week', hi: 'दिन खुला / हफ्ता' },
  strip4: { en: 'Happy Patients', hi: 'संतुष्ट मरीज' },
  // why choose us
  why_eyebrow: { en: 'Why Shlok Path Labs', hi: 'श्लोक पैथ लैब्स ही क्यों' },
  why_title: { en: 'Why Patients Trust Us', hi: 'मरीज हम पर भरोसा क्यों करते हैं' },
  why1_t: { en: 'Same Day Reports', hi: 'उसी दिन रिपोर्ट' },
  why1_p: { en: 'Most reports ready the same day, sent on WhatsApp.', hi: 'ज्यादातर रिपोर्ट उसी दिन तैयार, WhatsApp पर भेजी जाती है।' },
  why2_t: { en: 'MD Pathologists', hi: 'MD पैथोलॉजिस्ट' },
  why2_p: { en: 'Every report verified by qualified KGMU & BLDE doctors.', hi: 'हर रिपोर्ट KGMU व BLDE के योग्य डॉक्टरों द्वारा जांची जाती है।' },
  why3_t: { en: 'Affordable Rates', hi: 'किफायती रेट' },
  why3_p: { en: 'Honest, pocket-friendly pricing for every family.', hi: 'हर परिवार के लिए ईमानदार और किफायती दाम।' },
  why4_t: { en: 'Home Collection', hi: 'घर से सैंपल' },
  why4_p: { en: 'Sample pickup from your doorstep on request.', hi: 'रिक्वेस्ट पर आपके घर से सैंपल कलेक्शन।' },
  why5_t: { en: 'Reports on WhatsApp', hi: 'WhatsApp पर रिपोर्ट' },
  why5_p: { en: 'Download reports online anytime with your code.', hi: 'अपने कोड से कभी भी रिपोर्ट ऑनलाइन डाउनलोड करें।' },
  why6_t: { en: 'Open All 7 Days', hi: 'सातों दिन खुला' },
  why6_p: { en: '6 AM to 9 PM every day, including Sunday.', hi: 'रोज सुबह 6 से रात 9 बजे तक, संडे भी।' },
  // doctors
  doc_eyebrow: { en: 'Expert Team', hi: 'विशेषज्ञ टीम' },
  doc_title: { en: 'Our Pathologists', hi: 'हमारे पैथोलॉजिस्ट' },
  doc_sub: { en: 'Qualified MD doctors verify every report', hi: 'हर रिपोर्ट MD डॉक्टर द्वारा जांची जाती है' },
  doc1_q: { en: 'MD Pathology (KGMU, Lucknow)', hi: 'MD पैथोलॉजी (KGMU, लखनऊ)' },
  doc2_q: { en: 'MD Pathology (BLDE)', hi: 'MD पैथोलॉजी (BLDE)' },
  // contact
  contact_eyebrow: { en: 'Get In Touch', hi: 'संपर्क करें' },
  contact_title: { en: 'Visit Us / Contact', hi: 'हमसे संपर्क करें' },
  addr_t: { en: 'Address', hi: 'पता' },
  addr_v: { en: 'Near Lucknow Surgical Hospital, H.P. Petrol Pump, Kanpur Road, Banthara, Lucknow (UP)', hi: 'निकट लखनऊ सर्जिकल अस्पताल, एच.पी. पेट्रोल पम्प, कानपुर रोड, बन्थरा, लखनऊ (उ.प्र.)' },
  emerg_t: { en: '24x7 Emergency', hi: '24x7 इमरजेंसी' },
  emerg_n: { en: '(Ankit Kushwaha — available at the lab)', hi: '(अंकित कुशवाहा — लैब पर उपलब्ध)' },
  time_t: { en: 'Timing', hi: 'समय' },
  time_v: { en: '6:00 AM – 9:00 PM (All days, Sunday open)', hi: 'सुबह 6 – रात 9 बजे (सातों दिन, संडे भी खुला)' },
  reg_t: { en: 'Registration', hi: 'रजिस्ट्रेशन' },
  // footer
  foot_about: { en: 'Trusted pathology lab & digital X-ray centre in Banthara, Lucknow. Serving since 2021.', hi: 'बंथरा, लखनऊ का भरोसेमंद पैथोलॉजी लैब और डिजिटल एक्स-रे सेंटर। 2021 से सेवा में।' },
  foot_links: { en: 'Quick Links', hi: 'क्विक लिंक' },
  foot_contact: { en: 'Contact', hi: 'संपर्क' },
  // booking page
  book_title: { en: 'Book a Test Online', hi: 'ऑनलाइन टेस्ट बुक करें' },
  book_sub: { en: 'Fill the form — we will confirm on call/WhatsApp', hi: 'फॉर्म भरें — हम कॉल/WhatsApp पर कन्फर्म करेंगे' },
  f_name: { en: 'Patient Name *', hi: 'मरीज का नाम *' },
  f_phone: { en: 'Mobile Number *', hi: 'मोबाइल नंबर *' },
  f_tests: { en: 'Select Tests *', hi: 'टेस्ट चुनें *' },
  f_date: { en: 'Preferred Date *', hi: 'तारीख चुनें *' },
  f_notes: { en: 'Any note (optional)', hi: 'कोई और बात (वैकल्पिक)' },
  f_addr: { en: 'Full Address *', hi: 'पूरा पता *' },
  submit_book: { en: '✅ Book Now', hi: '✅ बुक करें' },
  submit_coll: { en: '🏠 Request Home Collection', hi: '🏠 घर से सैंपल मंगाएं' },
  // collection page
  coll_title: { en: 'Home Sample Collection', hi: 'घर से सैंपल कलेक्शन' },
  coll_sub: { en: 'Our phlebotomist will visit your home (nominal extra charge)', hi: 'हमारा स्टाफ आपके घर आएगा (मामूली अतिरिक्त चार्ज)' },
  // reports page
  rep_title: { en: 'Download Your Report', hi: 'अपनी रिपोर्ट डाउनलोड करें' },
  rep_sub: { en: 'Enter your name and mobile number (as given at the lab)', hi: 'अपना नाम और मोबाइल नंबर डालें (जैसा लैब में दिया था)' },
  rep_find: { en: '🔍 Find Report', hi: '🔍 रिपोर्ट खोजें' },
  rep_dl: { en: '⬇️ Download', hi: '⬇️ डाउनलोड' },
  rep_none: { en: 'No report found. Check name & number, or call the lab.', hi: 'कोई रिपोर्ट नहीं मिली। नाम और नंबर जांचें, या लैब को कॉल करें।' },
  // gallery
  gal_eyebrow: { en: 'Take A Look', hi: 'एक नज़र' },
  gal_title: { en: 'Our Lab — Photos', hi: 'हमारी लैब — तस्वीरें' },
  // tests page
  tests_title: { en: 'Tests & Services', hi: 'जांच और सेवाएं' },
  tests_sub: { en: 'For rates, please call or WhatsApp us', hi: 'रेट जानने के लिए कॉल या WhatsApp करें' },
  call_rate: { en: 'Call for rate', hi: 'रेट के लिए कॉल करें' },
  wa_btn: { en: 'Chat on WhatsApp', hi: 'WhatsApp पर बात करें' }
};

const LANG_KEY = 'shlok_lang';
function getLang() { return localStorage.getItem(LANG_KEY) || 'en'; }
function setLang(l) { localStorage.setItem(LANG_KEY, l); applyLang(); }
function t(key) { const e = I18N[key]; return e ? (e[getLang()] || e.en) : key; }
function applyLang() {
  document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = getLang() === 'hi' ? 'English' : 'हिंदी';
  document.documentElement.lang = getLang();
}

const WA_NUMBER = '917905010042';
const PHONE = '7905010042';

function waLink(msg) {
  return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg || 'Hello! I would like some information about Shlok Path Labs.');
}

function buildHeader(active) {
  return `
  <div class="topbar"><div class="container">
    <span data-i18n="top_timing"></span>
    <span><a href="tel:${PHONE}" data-i18n="top_phone"></a></span>
  </div></div>
  <header><div class="container nav">
    <a class="brand" href="/">
      <div class="logo" id="siteLogo">🔬</div>
      <div><h1>Shlok Path Labs</h1><small>&amp; DIGITAL X-RAY • LUCKNOW</small></div>
    </a>
    <button class="menu-btn" onclick="document.getElementById('navLinks').classList.toggle('open')">☰</button>
    <nav class="nav-links" id="navLinks">
      <a href="/" class="${active === 'home' ? 'active' : ''}" data-i18n="nav_home"></a>
      <a href="/tests" class="${active === 'tests' ? 'active' : ''}" data-i18n="nav_tests"></a>
      <a href="/booking" class="${active === 'book' ? 'active' : ''}" data-i18n="nav_book"></a>
      <a href="/collection" class="${active === 'coll' ? 'active' : ''}" data-i18n="nav_collection"></a>
      <a href="/reports" class="${active === 'rep' ? 'active' : ''}" data-i18n="nav_reports"></a>
      <button class="lang-btn" id="langBtn" onclick="setLang(getLang()==='hi'?'en':'hi')"></button>
    </nav>
  </div></header>`;
}

function buildFooter() {
  const y = new Date().getFullYear();
  return `
  <footer><div class="container">
    <div>
      <h5>Shlok Path Labs &amp; Digital X-Ray</h5>
      <p data-i18n="foot_about"></p>
      <p style="margin-top:8px"><span data-i18n="reg_t"></span>: RMEE2445935</p>
    </div>
    <div>
      <h5 data-i18n="foot_links"></h5>
      <a href="/tests" data-i18n="nav_tests"></a>
      <a href="/booking" data-i18n="nav_book"></a>
      <a href="/collection" data-i18n="nav_collection"></a>
      <a href="/reports" data-i18n="nav_reports"></a>
      <a href="/admin">🔐 <span data-i18n="nav_admin"></span></a>
    </div>
    <div>
      <h5 data-i18n="foot_contact"></h5>
      <a href="tel:${PHONE}">📞 ${PHONE}</a>
      <a href="tel:8177084581">🚨 <span data-i18n="emerg_t"></span>: 8177084581</a>
      <a href="mailto:shlok2021pathlabs@gmail.com">✉️ shlok2021pathlabs@gmail.com</a>
      <a href="${waLink()}" target="_blank">💬 WhatsApp</a>
      <p style="margin-top:6px" data-i18n="addr_v"></p>
    </div>
    <div class="copyright">© ${y} Shlok Path Labs &amp; Digital X-Ray, Banthara Sikandar Pur, Lucknow</div>
  </div></footer>
  <a class="wa-float" href="${waLink()}" target="_blank" title="WhatsApp">💬</a>`;
}

function initPage(active) {
  document.body.insertAdjacentHTML('afterbegin', buildHeader(active));
  document.body.insertAdjacentHTML('beforeend', buildFooter());
  applyLang();
  // If a logo image exists at /img/logo.png, use it
  const img = new Image();
  img.onload = () => {
    const el = document.getElementById('siteLogo');
    el.innerHTML = '';
    el.style.background = '#fff';
    el.style.borderRadius = '50%';
    el.appendChild(img);
  };
  img.src = '/img/logo.png';
  initAnimations();
}

/* ------- scroll reveal + stat count-up + header shadow ------- */
function initAnimations() {
  // Header shadow on scroll
  const header = document.querySelector('header');
  const onScroll = () => { if (header) header.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    document.querySelectorAll('.count').forEach(setFinalCount);
    return;
  }
  // Reveal sections as they scroll into view
  const revObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

  // Count-up numbers in the stats strip
  const numObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => { if (e.isIntersecting) { countUp(e.target); obs.unobserve(e.target); } });
  }, { threshold: 0.4 });
  document.querySelectorAll('.count').forEach(el => numObs.observe(el));
}
function fmt(n) { return n >= 1000 ? n.toLocaleString('en-IN') : String(n); }
function setFinalCount(el) { el.textContent = fmt(parseInt(el.dataset.count || '0', 10)) + (el.dataset.suffix || ''); }
function countUp(el) {
  const target = parseInt(el.dataset.count || '0', 10);
  const suffix = el.dataset.suffix || '';
  const dur = 1400, start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(Math.round(target * eased)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ------- test picker (booking/collection forms) ------- */
async function loadTestPicker(containerId) {
  const box = document.getElementById(containerId);
  if (!box) return;
  try {
    const tests = await (await fetch('/api/tests')).json();
    const lang = getLang();
    const byCat = {};
    tests.forEach(x => { (byCat[x.category] = byCat[x.category] || []).push(x); });
    box.innerHTML = '';
    const searchPh = lang === 'hi' ? '🔍 टेस्ट खोजें... जैसे CBC, Thyroid' : '🔍 Search test... e.g. CBC, Thyroid';
    box.insertAdjacentHTML('beforeend',
      `<input type="text" class="picker-search" placeholder="${searchPh}"
        style="width:100%;padding:9px 12px;border:1.5px solid #cfd8d3;border-radius:8px;font-size:14px;margin-bottom:8px;position:sticky;top:0;background:#fff">`);
    for (const [cat, arr] of Object.entries(byCat)) {
      let html = `<div class="cat-group"><div class="cat">${cat}</div>`;
      arr.forEach(x => {
        const nm = (lang === 'hi' && x.name_hi) ? x.name_hi : x.name_en;
        const key = (x.name_en + ' ' + (x.name_hi || '') + ' ' + x.category).toLowerCase().replace(/"/g, '&quot;');
        html += `<label data-search="${key}"><input type="checkbox" value="${x.name_en.replace(/"/g, '&quot;')}"> ${nm}${x.rate ? ' — ₹' + x.rate : ''}</label>`;
      });
      html += '</div>';
      box.insertAdjacentHTML('beforeend', html);
    }
    box.querySelector('.picker-search').addEventListener('input', function () {
      const q = this.value.toLowerCase().trim();
      box.querySelectorAll('.cat-group').forEach(g => {
        let visible = 0;
        g.querySelectorAll('label').forEach(l => {
          const show = !q || l.dataset.search.includes(q) || l.querySelector('input').checked;
          l.style.display = show ? '' : 'none';
          if (show) visible++;
        });
        g.style.display = visible ? '' : 'none';
      });
    });
  } catch (e) {
    box.innerHTML = '<p style="padding:8px;font-size:13px">Could not load tests — please refresh the page.</p>';
  }
}
function pickedTests(containerId) {
  return Array.from(document.querySelectorAll('#' + containerId + ' input:checked')).map(c => c.value).join(', ');
}
