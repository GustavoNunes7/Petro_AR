const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./petro_segura.db");

db.run(`
CREATE TABLE IF NOT EXISTS auditoria (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT,
    original TEXT,
    filtrado TEXT,
    status TEXT,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

module.exports = db;