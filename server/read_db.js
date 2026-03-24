const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./projects.db');
db.all('SELECT * FROM projects', (err, rows) => {
  if (err) throw err;
  console.log(JSON.stringify(rows, null, 2));
});
