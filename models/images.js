module.exports = function (sequelize, DataTypes) {
    var Image = sequelize.define('Image', {
        originalname: DataTypes.STRING,
        mimetype: DataTypes.STRING,
        destination: DataTypes.STRING,
        filename: DataTypes.STRING,
        path: DataTypes.STRING,
        size: DataTypes.INTEGER,
        //userid: DataTypes.INTEGER
    });
    return Image;
};
