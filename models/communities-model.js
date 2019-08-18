module.exports = function (sequelize, DataTypes) {
    const Community = sequelize.define('Community', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true,
            validate: {
                notNull: {
                    args: true,
                    msg: 'Please enter a name.'
                },
                len: {
                    args: [1, 64],
                    msg: 'The name must be between 1 and 64 characters long.'
                }
            }
        },
        FounderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Community.associate = function (models) {
        Community.belongsToMany(models.User, {
            through: 'CommunityUser',
            as: 'users'
        });

        Community.hasMany(models.Event, {
            foreignKey: {
                allowNull: true
            }
        });

        Community.hasMany(models.Post, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return Community;
};