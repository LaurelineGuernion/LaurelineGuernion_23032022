const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {};
  Post.init({
    UserId: DataTypes.INTEGER,
    contenu: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post'
  });
  return Post;
};