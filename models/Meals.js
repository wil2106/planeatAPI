/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Meals', {
    meal_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    recipe_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Recipes',
        key: 'recipe_id'
      }
    },
    mealtype_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'MealTypes',
        key: 'mealtype_id'
      }
    }
  }, {
    tableName: 'Meals',
    timestamps: false
  });
};