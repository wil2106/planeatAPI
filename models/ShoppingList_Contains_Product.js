/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ShoppingList_Contains_Product', {
    shoppinglist_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ShoppingLists',
        key: 'shoppinglist_id'
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
      primaryKey: true,
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
    tableName: 'ShoppingList_Contains_Product'
  });
};
