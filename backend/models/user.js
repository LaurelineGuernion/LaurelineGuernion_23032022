const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {};
  User.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    mdp: DataTypes.STRING,
    photo: DataTypes.STRING,
    bio: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};