const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {};
  Comment.init({
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER,
    contenu: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};