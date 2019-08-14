module.exports = function (sequelize, DataTypes) {
    const CommunityUser = sequelize.define('CommunityUser', {
        userID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
        commID: {
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