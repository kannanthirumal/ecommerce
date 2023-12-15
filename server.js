const express = require("express");
const cors = require("cors");

const serverConfig = require("./configs/server.config");
const bodyParser = require("body-parser");

const app = express();
/**cors - one domain only */
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    optionsSuccessStatus: 200,
  })
);

/**cors multiple domain */

// const allowedOrigins = [
//   "http://localhost:5500",
//   "https://yourfrontenddomain.com",
// ];

/**custom origin validation function */
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// }));

/**Simple - Array of Allowed Origins: */
// app.use(
//   cors({
//     origin: allowedOrigins,
//   })
// );

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = require("./models");
const Category = db.category;
const Role = db.role;

//Creating one to many relationship (category to product)
//The below single line of code establishes a one to many relationship between
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

  var roles = [
    { id: 1, name: "user" },
    { id: 2, name: "admin" },
  ];
  Role.bulkCreate(roles)
    .then(() => {
      console.log("role table initialised");
    })
    .catch((err) => {
      console.log("Error while initialising role table");
      console.log(`${err.message}`);
    });
}

require("./routes/category.routes")(app);
require("./routes/product.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/cart.routes")(app);

app.listen(serverConfig.PORT, () => {
  console.log("Application running on port: " + serverConfig.PORT);
});
