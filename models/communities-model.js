module.exports = function (sequelize, DataTypes) {
  const Community = sequelize.define('Community',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: 'That community name is already in use.' },
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
      bio: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
          notNull: {
            args: true,
            msg: 'Please enter a community bio.'
          }
        }
      },
      private: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    });

  Community.associate = function (models) {
    Community.belongsToMany(models.User, {
      through: 'CommunityUser',
      as: 'members'
    });

    Community.belongsToMany(models.User, {
      through: 'UserInvite',
      as: 'invited'
    });

    Community.belongsTo(models.User, {
      as: 'founder'
    });

    Community.hasMany(models.Event, {
      as: 'events'
    });

    Community.hasMany(models.Post, {
      as: 'posts'
    });
  };

  Community.addScopes = function (models) {
    Community.addScope('defaultScope', {
      order: [['id', 'DESC']],
      include: [{
        model: models.User,
        as: 'founder'
      }]
    });
  };

  return Community;
};