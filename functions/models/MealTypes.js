/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MealTypes', {
    mealtype_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'MealTypes'
  });
};
