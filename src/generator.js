const Repo = require('./repo');

const generator = (db, interval) => {
    const repo = Repo.createRepo(db)

    function startGenerator() {
        setInterval(() => {
            const code = require('./codeGenerator').newCode(10);
            db.transaction(() => {
                console.log(`start generation, insert code "${code}"`);
                const {count} = repo.getCountWithStateRequest.get(1);
                if (count < 100) {
                    const {idx} = repo.generateNewCodeCommand.get(code);
                    const newCode = repo.getCodeById.get(idx);
                    console.log('generated code:', newCode);
                } else {
                    console.log(`count of codes with state 1 is ${count}`)
                }
            }).exclusive()
        }, interval || 1000);
    }

    return {
        startGenerator,
    }
}

exports.createGenerator = generator;