const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {};
  Post.init({
    idUSER: DataTypes.INTEGER,
    contenu: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post'
  });
  return Post;
};