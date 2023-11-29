const express = require("express");

const serverConfig = require("./configs/server.config");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./models");
const Category = db.category;

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
}

require("./routes/category.routes")(app);
require("./routes/product.routes")(app);

app.listen(serverConfig.PORT, () => {
  console.log("Application running on port: " + serverConfig.PORT);
});
