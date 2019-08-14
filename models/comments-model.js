module.exports = function (sequelize, DataTypes) {
    const Comment = sequelize.define("Comment", {
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 2000],
                    msg: 'The message must be between 1 and 2000 characters long.'
                }
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