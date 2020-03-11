/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Brands', {
    brand_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    brand_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    tableName: 'Brands'
  });
};
