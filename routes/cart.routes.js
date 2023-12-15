const { authJwt } = require("../middleswares");
const cartController = require("../controllers/cart.controller");

module.exports = function (app) {
  app.post(
    "/ecomm/api/v1/carts",
    [authJwt.verifyToken],
    cartController.createCart
  );
  app.put(
    "/ecomm/api/v1/carts/:id",
    [authJwt.verifyToken],
    cartController.updateCart
  );
  app.get(
    "/ecomm/api/v1/carts/:cartId",
    [authJwt.verifyToken],
    cartController.getCart
  );
  app.delete(
    "/ecomm/api/v1/carts/:cartId",
    [authJwt.verifyToken],
    cartController.deleteCart
  );
};
