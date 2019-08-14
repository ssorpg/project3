module.exports = function (sequelize, DataTypes) {
    const CommunityUser = sequelize.define('CommunityUser', {
        userID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'User',
            key: 'id'
          }
        },
        commID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Community',
            key: 'id'
          }
        }
    });

    return CommunityUser;
}