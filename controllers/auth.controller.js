const db = require("../models");
const config = require("../configs/auth.config");

const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//User creation and role mapping
exports.signup = (req, res) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    //here, above, either you can use the salt round as a number for the bcrypt to
    //generate a salt of desirable length (here, 8) or you can give a salt value yourself i guess
    //here, i gave the salt rounds
  };
  User.create(user)
    .then((user) => {
      if (
        req.body.roles !== undefined ||
        req.body.roles !== null ||
        req.body.roles.length != 0
      ) {
        // if (req.body.roles.length != 0 && req.body.roles) {
        //coz, "roles: []" is coming asa truthy, so normal users are getting
        //into if blocks and getting all the roles both user and admin, so this
        //req.body.roles.length != 0 prevents it
        Role.findAll({
          where: {
            name: {
              //here I'm using a logical or, it will set the roles for all the roles provide by user
              //since the relationship is many to many,  the relationship table for user and roles
              //"user_roles" is expecting an array of inputs,
              //either this array can be empty, one or more tha one roles
              //if empty we default set it to "normal user"
              [Op.or]: req.body.roles,
            },
          },
        })
          .then((roles) => {
            user
              .setRoles(roles) //because the table name is role, sequelize is intelligent enough to give us the method "setRoles" to map
              .then(() => {
                //all the "requested" roles for a given user in just one word called "setRoles"
                res.status(201).send({
                  message: "User registered successfully",
                });
              })
              .catch((err) => {
                console.log(`Error message: ${err.message}`);
                res.status(500).send({
                  // message: `${err.message}`,
                  message:
                    "Some internal server error while processing the request",
                });
              });
          })
          .catch((err) => {
            console.log(`Error message: ${err.message}`);
            res.status(500).send({
              // message: `${err.message}`,
              message:
                "Some internal server error while processing the request",
            });
          });
      } else {
        // console.log("--------------");
        user
          .setRoles([1]) //in the if block we are finding roles based on role name, if found it will return the role id,
          .then(() => {
            //and we make use of that to set the relationship, but here we are directly providing the role id itself
            res.status(201).send({
              message: "User registered successfully",
            });
          })
          .catch((err) => {
            console.log(`Error message: ${err.message}`);
            res.status(500).send({
              // message: `${err.message}`,
              message:
                "Some internal server error while processing the request",
            });
          });
      }
    })
    .catch((err) => {
      console.log(`Error message: ${err.message}`);
      res.status(500).send({
        // message: `${err.message}`,
        message: "Some internal server error while processing the request",
      });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (user == null) {
        res.status(404).send({
          message: "User not found. Please sign up to create an account",
        });
        return;
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        res.status(401).send({
          message: "Invalid Password",
        });
        return;
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, //24 hours
      });

      res.status(200).send({
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      console.log(`Error message: ${err.message}`);
      res.status(500).send({
        // message: `${err.message}`,
        message: "Some internal server error while processing the request",
      });
    });
};

/**
 * 1. Set Roles:
 * ---------------
 * When you define a model using Sequelize, associations between models can be established.
 * In this context, it appears that there is a Many-to-Many association between the User model and the Role model.
 * The setRoles method is a dynamic method generated by Sequelize based on this association.
 *
 * 2. why array?
 * ---------------
 * In a Many-to-Many relationship, a single user can have multiple roles, and a single role can be associated
 * with multiple users. Using an array allows you to easily express and manage this multiplicity.
 * When setting associations using setRoles, providing an array of roles is a clean and expressive way
 * to communicate that the user is associated with multiple roles.
 *
 * 3. how to setRole, with role id or role object instance itself?
 * ------------------------------------------------------------------
 * In Sequelize's Many-to-Many associations, when you use the setRoles method, you can provide an array
 * of either role instances or role primary key values (IDs).
 * Sequelize is designed to handle both cases.
 *
 * The Role.findAll method returns an array of role objects.
 * When you use user.setRoles(roles), Sequelize internally extracts the primary key values (IDs)
 * from the role objects and associates the user with those roles.
 *
 * code
 * -----
 * const roles = [{ id: 1, name: 'admin' }, { id: 2, name: 'user' }];
 * user.setRoles(roles);
 * // This is essentially equivalent to
 * // user.setRoles([1, 2]);
 *
 *
 * In this case, when setting roles directly with user.setRoles([1]), Sequelize understands
 * that you're providing an array of primary key values (IDs).
 * Internally, Sequelize associates the user with roles having the specified IDs.
 *
 * code
 * ------
 * // This is equivalent to user.setRoles([1]);
 * user.setRoles([{ id: 1, name: 'admin' }]);
 */
