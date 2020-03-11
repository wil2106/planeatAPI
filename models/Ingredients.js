/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Ingredients', {
    ingredient_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    recipe_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Recipes',
        key: 'recipe_id'
      }
    },
    quantitytype_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'QuantityTypes',
        key: 'quantitytype_id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Products',
        key: 'product_id'
      }
    }
  }, {
    tableName: 'Ingredients',
    timestamps: false
  });
};
