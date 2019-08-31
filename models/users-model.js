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
        allowNull: true
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true
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

    User.belongsToMany(models.Event, {
      through: 'EventUser',
      as: 'events'
    });

    User.hasMany(models.Post, {
      foreignKey: {
        allowNull: true
      },
      as: 'wallPosts'
    });

    User.hasMany(models.Image, {
      foreignKey: {
        allowNull: true
      },
      as: 'profileImage'
    });
  };

  User.addScopes = function (models) {
    User.addScope('defaultScope', {
      attributes: {
        exclude: ['password', 'email'] // can't query email or password
      },
      order: [['id', 'DESC']],
      include: [{
        model: models.Image,
        as: 'profileImage',
        limit: 1
      }]
    });
  };

  return User;
};