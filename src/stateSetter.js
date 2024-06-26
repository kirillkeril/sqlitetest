const Repo = require('./repo');

const createStateSetter = (db, interval, currentState, newState) => {
    const repo = Repo.createRepo(db);

    function startStateSetter() {
        setInterval(() => {
            db.transaction(() => {
                const code = repo.getNextCodeWithStateRequest.get(currentState);
                if (!code) {
                    return;
                }
                console.log(`update state from ${currentState} to ${newState} for ${code.idx} (${code.ts})`);
                repo.updateStateByIdxCommand.run(newState, code.idx);
                console.log(`state updated for ${code.idx}`);
            })();
        }, interval);
    }

    return {
        startStateSetter,
    }
}

exports.createSetter = createStateSetter;