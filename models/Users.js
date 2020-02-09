/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    user_password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    user_mail: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    user_prenom: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    user_nom: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    user_ispremium: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
    tableName: 'Users'
  });
};
