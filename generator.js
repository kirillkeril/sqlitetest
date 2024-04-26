const db = require('better-sqlite3')('gen.db')

const generator = () => {
    db.exec(`
        CREATE TABLE IF NOT EXISTS gen (
        idx INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT NOT NULL,
        state SMALLINT NOT NULL DEFAULT 1,
        ts DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`)
    return () => {

    };
}

exports.generator = generator;