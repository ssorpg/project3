module.exports = function (sequelize, DataTypes) {
    const EventUser = sequelize.define('EventUser', {
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        eventId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Events',
            key: 'id'
          }
        }
    });

    return EventUser;
}