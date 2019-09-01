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
            msg: 'Please enter a name.'
          },
          len: {
            args: [1, 255],
            msg: 'The name must be between 1 and 255 characters long.'
          }
        }
      },
      date: {
        type: DataTypes.DATE,
        trim: true,
        validate: {
          isDate: { msg: 'Please enter a valid date.' }
        }
      }
    });

  Event.associate = function (models) {
    Event.belongsToMany(models.User, {
      through: 'EventUser',
      as: 'members'
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
      order: [['id', 'DESC']],
      include: [{
        model: models.User,
        as: 'founder'
      }]
    });
  };

  return Event;
};