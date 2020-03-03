/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Recipes', {
    recipe_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    recipe_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    recipe_description: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    recipe_nb_servings: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    recipe_prep_time: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    }
  }, {
    tableName: 'Recipes',
    timestamps: false
  });
};
