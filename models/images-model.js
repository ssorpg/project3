module.exports = function (sequelize, DataTypes) {
  const Image = sequelize.define('Image',
    {
      originalname: DataTypes.STRING,
      mimetype: DataTypes.STRING,
      destination: DataTypes.STRING,
      filename: DataTypes.STRING,
      path: DataTypes.STRING,
      size: DataTypes.INTEGER
    });

  Image.addScopes = function (models) {
    Image.addScope('defaultScope', {
      order: [['id', 'DESC']],
      attributes: ['filename']
    });
  };

  return Image;
};
