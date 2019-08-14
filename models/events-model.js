module.exports = function (sequelize, DataTypes) {
    const Event = sequelize.define("Event", {
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
                    args: [1, 255],
                    msg: 'The name must be between 1 and 255 characters long.'
                }
            }
        },
        founderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
            trim: true,
            validate: {
                isDate: { msg: 'Please enter a valid date.' }
            }
        }
    });

    Event.associate = function (models) {
        Event.belongsToMany(models.User, {
            through: 'EventUser',
            as: 'users',
            foreignKey: 'eventId'
        });

        Event.belongsTo(models.Community, {
            foreignKey: {
                allowNull: false
            }
        });

        Event.hasMany(models.Post, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return Event;
};