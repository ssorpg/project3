module.exports = function (sequelize, DataTypes) {
    const Comment = sequelize.define("Comment", {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [2, 64]
            }
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 0
        }
    });

    Comment.associate = function (models) {
        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Comment;
};