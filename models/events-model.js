module.exports = function (sequelize, DataTypes) {
  const Event = sequelize.define('Event',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
          notNull: {
            args: true,
            msg: 'Please enter a name for the event.'
          },
          len: {
            args: [1, 64],
            msg: 'The name must be between 1 and 64 characters long.'
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
          notNull: {
            args: true,
            msg: 'Please enter a description for the event.'
          },
          len: {
            args: [1, 255],
            msg: 'The description must be between 1 and 255 characters long.'
          }
        }
      },
      date: {
        type: DataTypes.DATEONLY,
        trim: true,
        validate: {
          isDate: { msg: 'Please enter a valid date.' },
        }
      },
      start_time: { // TODO validation
        type: DataTypes.STRING,
        trim: true,
      },
      end_time: {
        type: DataTypes.STRING,
        trim: true,
      }
    });

  Event.associate = function (models) {
    Event.belongsToMany(models.User, {
      through: 'EventUser',
      as: 'members'
    });

    Event.belongsTo(models.Community, {
      as: 'community'
    });

    Event.belongsTo(models.User, {
      as: 'founder'
    });

    Event.hasMany(models.Post, {
      as: 'posts'
    });
  };

  Event.addScopes = function (models) {
    Event.addScope('defaultScope', {
      order: [
        ['date', 'ASC'],
        ['start_time', 'ASC']
      ],
      include: [{
        model: models.User,
        as: 'founder'
      },
      {
        model: models.Community,
        as: 'community'
      }]
    });
  };

  return Event;
};