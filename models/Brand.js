/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Brand', {
    brand_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'Brand', 
    timestamps: false
  });
};
