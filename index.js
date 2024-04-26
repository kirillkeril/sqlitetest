const db = require('better-sqlite3')('../gen.db')
const gen = require("./src/generator.js");
const stateSetter = require("./src/stateSetter");

const {startGenerator} = gen.generator(100)
const {startStateSetter} = stateSetter.createSetter(db, 1000, 1, 2);

startGenerator();
startStateSetter();