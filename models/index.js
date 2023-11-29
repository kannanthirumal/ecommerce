/**
 * This file will be used for the following purpose:
 * 1. create the DB connection with the help of sequelize
 * 2. Export all the functionalities of the model through the file
 *
 * One of the biggest advantages of using index.js file is,
 * other file trying to import this file, just need to provide the module name
 */

const config = require("../configs/db.config");
const Sequelize = require("sequelize");

//creating the connection

const seq = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = seq;
db.category = require("./category.model")(seq, Sequelize);
db.product = require("./product.model")(seq, Sequelize);

module.exports = db;
