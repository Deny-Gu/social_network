const { DataTypes  } = require('sequelize')

module.exports = (sequelize) => {
    const FriendsModel = sequelize.define(
      'friends',
      {
        id: {type: DataTypes.INTEGER, unique: true, primaryKey: true},
        idUser: {type: DataTypes.INTEGER},
        idFriend: {type: DataTypes.INTEGER},
      }
    )
  
    return FriendsModel
  }