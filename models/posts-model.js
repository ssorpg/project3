module.exports = function (sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
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
                allowNull: true
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