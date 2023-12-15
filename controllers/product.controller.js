const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  //added these validations in the middleware, so commenting out here
  // if (!req.body.name) {
  //   res.status(400).send({
  //     message: "Name of the product can't be empty",
  //   });
  //   return;
  // }

  // if (!req.body.cost) {
  //   res.status(400).send({
  //     message: "Cost of the product can't be empty",
  //   });
  //   return;
  // }

  let product = {
    name: req.body.name,
    description: req.body.description,
    cost: req.body.cost,
    categoryId: req.body.categoryId, //after establishing the relationship between category and products
  };

  Product.create(product)
    .then((product) => {
      console.log(`product name: [${product.name}] got inserted`);
      res.status(201).send(product);
    })
    .catch((err) => {
      console.log(`Issue in inserting product name: [${product.name}]`);
      console.log(`Error message: ${err.message}`);
      res.status(500).send({
        message: "Some internal server error while creating the product",
      });
    });
};

exports.findAll = (req, res) => {
  let productName = req.query.name;
  let minCost = req.query.minCost;
  let maxCost = req.query.maxCost;
  let promise;
  if (productName) {
    promise = Product.findAll({
      where: {
        name: productName,
      },
    });
  } else if (minCost && maxCost) {
    promise = Product.findAll({
      where: {
        cost: {
          [Op.gte]: minCost,
          [Op.lte]: maxCost,
        },
      },
    });
  } else if (minCost) {
    promise = Product.findAll({
      where: {
        cost: {
          [Op.gte]: minCost,
        },
      },
    });
  } else if (maxCost) {
    promise = Product.findAll({
      where: {
        cost: {
          [Op.lte]: maxCost,
        },
      },
    });
  } else {
    promise = Product.findAll();
  }

  promise
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      console.log(`Somme internal error while fetching the products`);
      res.status(500).send({
        message: "Somme internal error while fetching the products",
      });
    });
};

exports.findOne = (req, res) => {
  const productId = req.params.id;
  Product.findByPk(productId)
    .then((product) => {
      if (product == null) {
        return res.status(404).send({
          message: "Product not found",
        });
      }
      res.status(200).send(product);
    })
    .catch((err) => {
      console.log();
      res.status(500).send({
        message: "Some internal server while fetching the product",
      });
    });
};

exports.update = (req, res) => {
  //added these validations in the middleware, so commenting out here
  // if (!req.body.name) {
  //   res.status(400).send({
  //     message: "Name of the product can't be empty",
  //   });
  //   return;
  // }

  // if (!req.body.cost) {
  //   res.status(400).send({
  //     message: "Cost of the product can't be empty",
  //   });
  //   return;
  // }

  const product = {
    name: req.body.name,
    description: req.body.description,
    cost: req.body.cost,
    categoryId: req.body.categoryId,
  };

  const productId = req.params.id;

  Product.update(product, {
    where: {
      id: productId,
    },
  })
    .then((updatedProduct) => {
      Product.findByPk(productId)
        .then((product) => {
          res.status(200).send(product);
        })
        .catch((err) => {
          res.status(500).send({
            message: "Some internal server error while fetching the product",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some interval server error while updating the product",
      });
    });
};

exports.delete = (req, res) => {
  let productId = req.params.id;

  Product.destroy({
    where: {
      id: productId,
    },
  })
    .then((result) => {
      res.status(200).send({
        message: "Product deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Some internal server error while deleting the category based on id",
      });
    });
};

/**
 * Getting a list of all the products under a single
 */

exports.getProductsUnderCategory = (req, res) => {
  let categoryId = parseInt(req.params.categoryId);
  //parseInt -> just in case if the user sends an integer as a string, we convert that to number for safer side
  //if categoryId - null - not passed, and this validation can be added in a separate validator
  //if needed, but I didn't add as of now
  db.category
    .findByPk(categoryId)
    .then((category) => {
      if (category == null) {
        res.status(404).send({
          message: "Category doesn't exist",
        });
        return;
      } else {
        Product.findAll({
          where: {
            categoryId: categoryId,
          },
        })
          .then((products) => {
            if (products == null) {
              res.status(404).send({
                message: "No products found",
              });
              return;
            }
            res.status(200).send(products);
          })
          .catch((err) => {
            res.status(500).send({
              message: "Some internal server error while fetching the products",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some internal server error while fetching the category",
      });
    });
};
