/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Items', {
    article_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      references: {
        model: 'Articles',
        key: 'article_id'
      }
    },
    shoppinglist_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ShoppingLists',
        key: 'shoppinglist_id'
      }
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    tableName: 'Items',
    timestamps: false
  });
};
