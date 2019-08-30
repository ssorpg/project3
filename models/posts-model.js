module.exports = function (sequelize, DataTypes) {
  const Post = sequelize.define('Post',
    {
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        trim: true,
        validate: {
          notNull: {
            args: true,
            msg: 'Please enter a message.'
          },
          len: {
            args: [1, 2000],
            msg: 'Your message must be between 1 and 2000 characters long.'
          }
        }
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });

  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      },
      as: 'author'
    });

    Post.hasMany(models.Comment, {
      foreignKey: {
        allowNull: true
      },
      as: 'comments'
    });

    Post.belongsToMany(models.User, {
      through: 'PostVoter',
      as: 'voters'
    });
  };

  Post.addScopes = function (models) {
    Post.addScope('defaultScope', {
      order: [['id', 'DESC']],
      include: [{
        model: models.User,
        as: 'author'
      },
      {
        model: models.Comment,
        as: 'comments'
      }]
    });
  };

  return Post;
};