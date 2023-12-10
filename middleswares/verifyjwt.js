const config = require("../configs/auth.config");
const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    res.status(403).send({
      message: "No token provided",
    });
    return;
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      res.status(401).send({
        message: "Unauthorised",
      });
    }

    req.userId = decoded.id;

    User.findByPk(req.userId)
      .then((user) => {
        if (user == null) {
          res.status(404).send({
            message: "User not found",
          });
          return;
        }
        next();
      })
      .catch((err) => {
        console.log(`err: ${err.message}`);
        res.status(500).send({
          message: "Some internal server error while fethcing the user",
        });
      });
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId)
    .then((user) => {
      if (user == null) {
        res.status(404).send({
          message: "User not found",
        });
        return;
      }
      user
        .getRoles()
        .then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }

          res.status(403).send({
            message: "Require admin role",
          });
          return;
        })
        .catch((err) => {
          console.log(`err: ${err.message}`);
          res.status(500).send({
            message: "Some internal server error while checking the role",
          });
        });
    })
    .catch((err) => {
      console.log(`err: ${err.message}`);
      res.status(500).send({
        message: "Some internal server error while fethcing the user",
      });
    });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};

module.exports = authJwt;
