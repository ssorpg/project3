module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 64]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 64]
            }
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
            foreignKey: 'userID'
        });
    };

    User.associate = function (models) {
        User.belongsToMany(models.Event, {
            through: 'EventUser',
            as: 'events',
            foreignKey: 'userID'
        });
    };
    
    User.associate = function (models) {
        User.hasMany(models.Post, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return User;
};