module.exports = function (sequelize, DataTypes) {
    const Event = sequelize.define("Event", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 64]
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: true
            }
        }
    });

    Event.associate = function (models) {
        Event.belongsTo(models.Community, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    Event.associate = function (models) {
        Event.hasMany(models.Post, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return Event;
};