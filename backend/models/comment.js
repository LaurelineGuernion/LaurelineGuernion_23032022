const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {};
  Comment.init({
    idUSERS: DataTypes.INTEGER,
    idPOSTS: DataTypes.INTEGER,
    contenu: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};