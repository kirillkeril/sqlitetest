const Repo = require('./repo');

const stateSetter = (db, interval, currentState, newState) => {
    const repo = Repo.createRepo(db);

    function startStateSetter() {
        setInterval(() => {
            db.transaction(() => {
                console.log(`update state from ${currentState} to ${newState}`);
                const code = repo.getNextCodeWithStateRequest.get(1);
                console.log(code);
            });
        }, interval);
    }
}

exports.default = stateSetter;