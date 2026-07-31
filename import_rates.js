// One-time import: loads rates.json (from SPL RATE LIST docx) into the tests table.
// Run: node import_rates.js
const db = require('./db');
const rates = require('./rates.json');

db.prepare('DELETE FROM tests').run();
const ins = db.prepare('INSERT INTO tests (name_en, name_hi, category, rate, show_rate) VALUES (?, ?, ?, ?, 0)');
const tx = db.transaction(list => {
  for (const t of list) ins.run(t.name, '', t.cat, t.rate);
});
tx(rates);

// Real address from the rate list letterhead
db.prepare("UPDATE settings SET value=? WHERE key='address'")
  .run('Lucknow Surgical Hospital, Kanpur Road, Banthara, Lucknow (UP)');

console.log('Imported', db.prepare('SELECT COUNT(*) c FROM tests').get().c, 'tests');
