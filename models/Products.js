/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Products', {
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    product_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'Products',
    timestamps:false
  });
};
