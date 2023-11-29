const db = require("../models");
const Category = db.category;

exports.create = (req, res) => {
  /**
   * validation of request body - will come to it later
   */

  if (!req.body.name) {
    res.status(400).send({
      message: "Name of the category can't be empty",
    });
    return;
  }

  /**
   * proceed to create the category object to be inserted into db
   */

  const category = {
    name: req.body.name,
    description: req.body.description,
  };

  Category.create(category)
    .then((category) => {
      console.log(`category name: [${category.name}] got inserted`);
      res.status(201).send(category);
    })
    .catch((err) => {
      console.log(`Issue in inserting category name: [${category.name}]`);
      console.log(`Error message: ${err.message}`);
      res.status(500).send({
        message: "Some internal error while creating the category!",
      });
    });
};

exports.findAll = (req, res) => {
  //ecomm/v1/categories/kitchen - one type
  //ecomm/v1/categories - second type
  let categoryName = req.query.name;
  let promise;
  if (categoryName) {
    promise = Category.findAll({
      where: {
        name: categoryName,
      },
    });
  } else {
    promise = Category.findAll();
  }

  promise
    .then((categories) => {
      res.status(200).send(categories);
    })
    .catch((err) => {
      console.log(`Somme internal error while fetching the categories`);
      res.status(500).send({
        message: "Somme internal error while fetching the categories!",
      });
    });
};

exports.findOne = (req, res) => {
  let categoryId = req.params.id;

  Category.findByPk(categoryId)
    .then((category) => {
      if (category == null) {
        return res.status(404).send({
          message: "category not found",
        });
      }
      res.status(200).send(category);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some internal server error while fetching the category",
      });
    });
};

exports.update = (req, res) => {
  const category = {
    name: req.body.name,
    description: req.body.description,
  };

  const categoryId = req.params.id;

  Category.update(category, {
    where: {
      id: categoryId,
    },
  })
    .then((updatedCategory) => {
      //again find the updated category that got updated in the db
      Category.findByPk(categoryId)
        .then((category) => {
          res.status(200).send(category);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              "Some internal error while fetching the category based on id",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some internal error while updating the caetory",
      });
    });
};

exports.delete = (req, res) => {
  let categoryId = req.params.id;

  Category.destroy({
    where: {
      id: categoryId,
    },
  })
    .then((result) => {
      res.status(200).send({
        message: "Successfully deleted the category",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Some internal server error whie deleting the category based on id",
      });
    });
};
