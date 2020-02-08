/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Market_Sell_Product', {
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Products',
        key: 'product_id'
      }
    },
    market_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Markets',
        key: 'market_id'
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
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'Market_Sell_Product'
  });
};
