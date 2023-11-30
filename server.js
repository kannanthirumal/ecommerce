const express = require("express");

const serverConfig = require("./configs/server.config");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./models");
const Category = db.category;
const Role = db.role;

//Creating one to many relationship (category to product)
//The below sing le line of code establishes a one to many relationship between
//a category and a product, by creating a foreign key column (categoryId) in the product table
Category.hasMany(db.product);

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("tables dropped and created");
    init();
  })
  .catch();

function init() {
  var categories = [
    {
      name: "Electronis",
      description: "This category will contain all the electronic products",
    },
    {
      name: "Kitchen items",
      description: "This category will contain all the Kitchen products",
    },
    {
      name: "Skin Care",
      description: "This category will contain all the Skin Care products",
    },
  ];

  Category.bulkCreate(categories)
    .then(() => {
      console.log("Category table initialised");
    })
    .catch(() => {
      console.log("Error while initialising category table");
    });

  /**
   * Adding roles
   */

  var roles = db.ROLES;
  Role.bulkCreate(roles)
    .then(() => {
      console.log("role table initialised");
    })
    .catch(() => {
      console.log("Error while initialising role table");
    });
}

require("./routes/category.routes")(app);
require("./routes/product.routes")(app);
require("./routes/auth.routes")(app);

app.listen(serverConfig.PORT, () => {
  console.log("Application running on port: " + serverConfig.PORT);
});
