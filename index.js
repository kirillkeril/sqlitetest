const db = require('better-sqlite3')('../gen.db')
const gen = require("./src/generator.js");
const {startGenerator} = gen.createGenerator(db, 1000)

startGenerator();