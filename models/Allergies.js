/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Allergies', {
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Products',
        key: 'product_id'
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
    }
  }, {
    tableName: 'Allergies',
    timestamps: false
  });
};
