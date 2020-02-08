/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Markets', {
    market_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    market_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'Markets'
  });
};
