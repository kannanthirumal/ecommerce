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
db.user = require("./user.model")(seq, Sequelize);
db.role = require("./role.model")(seq, Sequelize);
db.cart = require("./cart.model")(seq, Sequelize);
/**
 * Establishing many to many relationship between user table and roles table
 * 1. One user can have multiple roles
 * 2. One Role can have multiple users
 *
 * 3. We are going to achieve this using a third table which has the mapping done
 * 4. This third table is called "user_roles", and it will have a foreign key from both user and role table
 */

/**
 * Estblishing this Many to many between user and role using sequelize
 */

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.ROLES = ["user", "admin"];

/**
 * Relationship between Cart and Products: Many to Many
 */

db.product.belongsToMany(db.cart, {
  through: "cart_products",
  foreignKey: "productId",
  otherKey: "cartId",
});

db.cart.belongsToMany(db.product, {
  through: "cart_products",
  foreignKey: "cartId",
  otherKey: "productId",
});

/**
 * Relationship between Cart and user
 */

db.user.hasMany(db.cart);

module.exports = db;
