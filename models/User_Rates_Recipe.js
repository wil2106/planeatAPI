/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User_Rates_Recipe', {
    recipe_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Recipes',
        key: 'recipe_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    rate: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'User_Rates_Recipe', 
    timestamps: false
  });
};
