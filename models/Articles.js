/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Articles', {
    article_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    },
    market_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Markets',
        key: 'market_id'
      }
    },
    brand_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Brands',
        key: 'brand_id'
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'Articles',
    timestamps: false
  });
};
