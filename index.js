const db = require('better-sqlite3')('./gen.db')
const gen = require("./src/generator.js");
const stateSetter = require("./src/stateSetter");

const {startGenerator} = gen.createGenerator(db, 500)
const {startStateSetter: startState2Setter} = stateSetter.createSetter(db, 1000, 1, 2);
const {startStateSetter: startState3Setter} = stateSetter.createSetter(db, 10000, 2, 3);

startGenerator();
startState2Setter();
startState3Setter();
