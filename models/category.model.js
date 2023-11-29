/**
 * category schema
 * fields:
 * id, name , description
 */

module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define(
    "category",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: "categories", //custom name for our category table
    }
  );
  return Category;
};
