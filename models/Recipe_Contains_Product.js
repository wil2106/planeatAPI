/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Recipe_Contains_Product', {
    recipe_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Recipes',
        key: 'recipe_id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Products',
        key: 'product_id'
      }
    },
    quantitytype_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'QuantityTypes',
        key: 'quantitytype_name'
      }
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'Recipe_Contains_Product', 
    timestamps: false
  });
};
