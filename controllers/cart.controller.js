const db = require("../models");
const Product = db.product;
const Cart = db.cart;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const cart = {
    userId: req.userId, //we are getting this from the middleware, verifyJwt
  };

  Cart.create(cart)
    .then((cart) => {
      res.status(201).send(cart);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some internal server error happened",
        err: err.message,
      });
    });
};

exports.update = (req, res) => {
  const cartId = req.params.id;

  Cart.findByPk(cartId)
    .then((cart) => {
      Product.findAll({
        where: {
          id: {
            [Op.or]: req.body.productIds,
          },
        },
      })
        .then((items) => {
          if (!items || items.length == 0) {
            res.status(400).send({
              message: "Items trying to add does not exist",
            });
            return;
          }

          cart
            .setProducts(items)
            .then(() => {
              var cost = 0;
              const productsSelected = [];
              cart
                .getProducts()
                .then((products) => {
                  for (i = 0; i < products.length; i++) {
                    cost = cost + products[i].cost;
                    productsSelected.push({
                      id: products[i].id,
                      name: products[i].name,
                      cost: products[i].cost,
                    });
                  }

                  res.status(200).send({
                    id: cart.id,
                    productsSelected: productsSelected,
                    cost: cost,
                  });
                })
                .catch((err) => {
                  res.status(500).send({
                    message:
                      "Some internal server error while fetching the products from the cart",
                  });
                });
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  "Some internal server error in adding the products to the cart",
              });
            });
        })
        .catch((err) => {
          console.log(`err: ${err.message}`);
          res.status(500).send({
            message:
              "Some internal server error happened while fetching the products details inorder to add to the cart",
          });
        });
    })
    .catch((err) => {
      console.log(`err: ${err.message}`);
      res.status(500).send({
        message:
          "Some internal server error happened while fetching cart details",
      });
    });
};

exports.getCart = (req, res) => {};
