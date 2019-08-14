module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 64],
                    msg: 'Your name must be between 1 and 64 characters long.'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: { msg: 'That email is already in use.' },
            validate: {
                isEmail: { msg: 'Please enter a valid email.' },
                max: {
                    args: 64,
                    msg: 'Your email can be at most 64 characters long.'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    User.associate = function (models) {
        User.belongsToMany(models.Community, {
            through: 'CommunityUser',
            as: 'communities',
            foreignKey: 'userId'
        });

        User.belongsToMany(models.Event, {
            through: 'EventUser',
            as: 'events',
            foreignKey: 'userId'
        });

        User.hasMany(models.Post, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return User;
};