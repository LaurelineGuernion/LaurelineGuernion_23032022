'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      models.User.hasMany(models.Post);
      models.User.hasMany(models.Comment);
    }
  };
  
  User.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    bio: DataTypes.TEXT,
    photo: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};