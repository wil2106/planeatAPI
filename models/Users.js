/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Users', {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    user_mail: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    user_ispremium: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    user_token: {
      type: DataTypes.STRING(500),
      allowNull: false
    }
  }, {
    tableName: 'Users',
    timestamps: false
  });
};