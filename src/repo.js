const repo = (db) => {
    const createTable = () => {
        db.exec(`
            CREATE TABLE IF NOT EXISTS gen (
            idx INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT NOT NULL,
            state SMALLINT NOT NULL DEFAULT 1,
            ts DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`);
        console.log('created');
    }

    createTable();

    const generateNewCodeCommand = db.prepare(`
        INSERT INTO gen (code) VALUES (?) RETURNING idx
    `);

    const getCountWithStateRequest = db.prepare(`
        SELECT COUNT(*) as count FROM gen WHERE state = ? ORDER BY ts
    `);

    const getCodeById = db.prepare(`
        SELECT * FROM gen WHERE idx = ?
    `);

    const getNextCodeWithStateRequest = db.prepare(`
        SELECT * FROM gen WHERE state = ? ORDER BY ts LIMIT 1
    `)

    const updateStateByIdxCommand = db.prepare(`
        UPDATE gen SET state = ? WHERE idx = ?
    `)

    return {
        getNextCodeWithStateRequest,
        updateStateByIdxCommand,
        getCountWithStateRequest,
        generateNewCodeCommand,
        getCodeById,
    }
}

exports.createRepo = repo