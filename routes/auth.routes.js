const authController = require("../controllers/auth.controller");
const { verifySignUp } = require("../middleswares");
module.exports = function (app) {
  app.post(
    "/ecomm/api/v1/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    authController.signup
  );
  app.post("/ecomm/api/v1/auth/signin", [], authController.signin);
};
