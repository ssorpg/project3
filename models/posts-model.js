module.exports = function (sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                max: {
                    args: 64,
                    msg: 'The title can be at most 64 characters long.'
                }
            }
        },
        message: {
            type: DataTypes.TEXT,
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

    Post.associate = function (models) {
        Post.belongsTo(models.Community, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    Post.associate = function (models) {
        Post.belongsTo(models.Event, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    Post.associate = function (models) {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    Post.associate = function (models) {
        Post.hasMany(models.Comment, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return Post;
};