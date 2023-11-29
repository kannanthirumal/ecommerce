const db = require("../models");
const Product = db.product;

exports.create = (req, res) => {
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

  let product = {
    name: req.body.name,
    description: req.body.description,
    cost: req.body.cost,
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
  let promise;
  if (productName) {
    promise = Product.findAll({
      where: {
        name: productName,
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

  const product = {
    name: req.body.name,
    description: req.body.description,
    cost: req.body.cost,
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
        message: "product deleted successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Somme internal server error while deleting the category based on id",
      });
    });
};
