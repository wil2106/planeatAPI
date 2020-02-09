/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('QuantityTypes', {
    quantitytype_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'QuantityTypes'
  });
};
