module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
          notNull: {
            args: true,
            msg: 'Please enter your name.'
          },
          len: {
            args: [1, 64],
            msg: 'Your name must be between 1 and 64 characters long.'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: { msg: 'That email is already in use.' },
        trim: true,
        validate: {
          isEmail: { msg: 'Please enter a valid email.' },
          len: {
            args: [1, 64],
            msg: 'Your email must be between 1 and 64 characters long.'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
        validate: {
          notNull: {
            args: true,
            msg: 'Please enter a password.'
          }
        }
      },
      bio: {
        type: DataTypes.TEXT,
        trim: true,
        validate: {
          len: {
            args: [1, 2000],
            msg: 'Your bio must be between 1 and 2000 characters long.'
          }
        }
      },
      location: {
        type: DataTypes.STRING,
        trim: true,
        validate: {
          len: {
            args: [1, 64],
            msg: 'Your location must be between 1 and 64 characters long.'
          }
        }
      },
      status: {
        type: DataTypes.STRING,
        trim: true,
        validate: {
          len: {
            args: [1, 255],
            msg: 'Your status must be between 1 and 255 characters long.'
          }
        }
      }
    });

  User.associate = function (models) {
    User.belongsToMany(models.Community, {
      through: 'CommunityUser',
      as: 'communities'
    });

    User.belongsToMany(models.Community, {
      through: 'UserInvite',
      as: 'invites'
    });

    // User.belongsToMany(models.Event, {
    //   through: 'EventInvite',
    //   as: 'eventInvites'
    // });

    User.belongsToMany(models.Event, {
      through: 'EventUser',
      as: 'events'
    });

    User.hasMany(models.Post, {
      as: 'posts'
    });

    User.hasMany(models.Image, {
      as: 'profileImage'
    });
  };

  User.addScopes = function (models) {
    User.addScope('defaultScope', {
      order: [['id', 'DESC']],
      attributes: {
        exclude: ['password', 'email'] // can't query email or password
      },
      include: [{
        model: models.Image,
        as: 'profileImage',
        limit: 1
      }]
    });
  };

  return User;
};
