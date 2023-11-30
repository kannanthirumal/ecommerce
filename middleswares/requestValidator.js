const db = require("../models");
const Category = db.category;

const validateCategoryRequest = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name of the category can't be empty",
    });
    return;
  }
  next();
  //next basically calls the next middleware/controller whetever is inline next
  //you can check the sequence of middlewares / controllers in the route page
  //in the http request section
  //e.g. app.post("/ecomm/api/v1/categories",[requestValidator.validateCategoryRequest],categoryController.create);
};

const validateProductRequest = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name of the product can't be empty",
    });
    return;
  }

  if (!req.body.cost) {
    res.status(400).send({
      message: "Cost of the product can't be empty",
    });
    return;
  }

  if (!req.body.categoryId) {
    res.status(400).send({
      message: "CategoryId was not passed",
    });
    return;
  } else {
    Category.findByPk(req.body.categoryId)
      .then((category) => {
        if (category == null) {
          res.status(404).send({
            message: "Eneterd category doesn't exist",
          });
          return;
        }
        next(); //calls the next middleware that is in line
      })
      .catch((err) => {
        res.status(500).send({
          message: "Some internal server error while fetching the category id",
          // err: `${err.message}`, //for debugging purpose i added it and commened it out after debugging
        });
      });
  }
};
module.exports = {
  validateCategoryRequest: validateCategoryRequest,
  validateProductRequest: validateProductRequest,
};
