/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ShoppingLists', {
    shoppinglist_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    shoppinglist_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    shoppinglist_start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    shoppinglist_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
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
