/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MealTypes', {
    mealtype_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    mealtype_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'MealTypes',
    timestamps: false
  });
};
