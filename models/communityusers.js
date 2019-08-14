module.exports = function (sequelize, DataTypes) {
    const CommunityUser = sequelize.define('CommunityUser', {
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        commId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Communities',
            key: 'id'
          }
        }
    });

    return CommunityUser;
}