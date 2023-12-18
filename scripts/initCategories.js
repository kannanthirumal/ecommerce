const db = require("../models");
const Category = db.category;

function initCategories() {
  var categories = [
    {
      name: "Electronics",
      description: "This category includes a variety of electronic products.",
    },
    {
      name: "Kitchenware",
      description:
        "Explore our selection of kitchen products for cooking enthusiasts.",
    },
    {
      name: "Skincare",
      description: "Discover a range of skincare products to pamper your skin.",
    },
    {
      name: "Sports & Outdoors",
      description: "Find sports products for an active and healthy lifestyle.",
    },
    {
      name: "Clothing & Apparel",
      description:
        "Browse through fashionable clothing and stylish apparel options.",
    },
    {
      name: "Home Decor",
      description:
        "Enhance your living space with our collection of home decor items.",
    },
    {
      name: "Books & Literature",
      description:
        "Dive into the world of literature with our diverse selection of books.",
    },
    {
      name: "Health & Wellness",
      description:
        "Prioritize your well-being with our health and wellness products.",
    },
    {
      name: "Toys & Games",
      description:
        "Explore a world of fun and excitement with our toys and games.",
    },
    {
      name: "Jewelry & Accessories",
      description:
        "Accessorize your look with our elegant jewelry and stylish accessories.",
    },
  ];

  Category.bulkCreate(categories)
    .then(() => {
      console.log("Category table initialized");
    })
    .catch(() => {
      console.log("Error while initializing category table");
    });
}

module.exports = initCategories;
