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
      foreignKey: {
        allowNull: true
      },
      as: 'founder'
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