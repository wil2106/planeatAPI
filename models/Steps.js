/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Steps', {
    step_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    step_order_number: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    step_description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    recipe_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Recipes',
        key: 'recipe_id'
      }
    }
  }, {
    tableName: 'Steps',
    timestamps: false
  });
};