module.exports = function (sequelize, DataTypes) {
    const Comment = sequelize.define('Comment', {
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
            defaultValue: 0
        }
    },
        {
            defaultScope: {
                order: [['id', 'DESC']]
            }
        });

    Comment.associate = function (models) {
        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            },
            as: 'author'
        });

        Comment.belongsToMany(models.User, {
            through: 'CommentVoter',
            as: 'voters'
        });
    };

    return Comment;
};