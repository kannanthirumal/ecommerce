const categoryController = require("../controllers/category.controller");
const requestValidator = require("../middleswares/index");

module.exports = function (app) {
  app.post(
    "/ecomm/api/v1/categories",
    [requestValidator.validateCategoryRequest],
    categoryController.create
  );
  app.get("/ecomm/api/v1/categories", categoryController.findAll);
  app.get("/ecomm/api/v1/categories/:id", categoryController.findOne);
  app.put(
    "/ecomm/api/v1/categories/:id",
    [requestValidator.validateCategoryRequest],
    categoryController.update
  );
  app.delete("/ecomm/api/v1/categories/:id", categoryController.delete);
};
