require
const fs = require("fs");
const path = require("path");
const { Model } = require("sequelize");
const Sequelize = require("sequelize");
let connection;
  
if (process.env.NODE_ENV === "test") {
  const { database } = require("../tests/testConfig");
  connection = new Sequelize({ dialect: "sqlite", storage: database, });
} else {
  console.log(process.env.DATABASE_URL);
  connection = new Sequelize(process.env.DATABASE_URL);
}

const db = { connection };


fs.readdirSync(path.join(__dirname, "models")).forEach((file) => {
  const model = require(path.join(__dirname, "models", file))(connection);
  //console.log(model.name, model.prototype.constructor.name);
  db[model.name] = model;
});

for(let modelName in db) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

module.exports = db;