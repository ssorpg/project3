module.exports = function (sequelize, DataTypes) {
    const Community = sequelize.define("Community", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 64]
            }
        },
        founder: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 64]
            }
        }
    });

    Community.associate = function (models) {
        Community.belongsToMany(models.User, {
            through: 'CommunityUser',
            as: 'users',
            foreignKey: 'commID'
        });
    };

    Community.associate = function (models) {
        Community.hasMany(models.Event, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    Community.associate = function (models) {
        Community.hasMany(models.Post, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return Community;
};