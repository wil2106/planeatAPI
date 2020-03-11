/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('QuantityTypes', {
    quantitytype_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    quantitytype_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'QuantityTypes',
    timestamps: false
  });
};
