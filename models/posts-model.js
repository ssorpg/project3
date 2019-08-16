module.exports = function (sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            trim: true,
            validate: {
                len: {
                    args: [1, 64],
                    msg: 'The title must be between 1 and 64 characters long.'
                }
            }
        },
        AuthorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
            trim: true,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Please enter a message.'
                },
                len: {
                    args: [1, 2000],
                    msg: 'Your message must be between 1 and 2000 characters long.'
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

        Post.belongsTo(models.Event, {
            foreignKey: {
                allowNull: true
            }
        });

        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: true
            }
        });

        Post.hasMany(models.Comment, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return Post;
};