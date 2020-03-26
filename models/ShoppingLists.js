/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('ShoppingLists', {
    shoppinglist_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    shoppinglist_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    shoppinglist_start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    shoppinglist_end_date: {
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
    }
  }, {
    tableName: 'ShoppingLists',
    timestamps: false
  });
};