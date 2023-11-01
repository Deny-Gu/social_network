const { DataTypes  } = require('sequelize')

module.exports = (sequelize) => {
    const ChatsModel = sequelize.define(
      'chats',
      {
        id: {type: DataTypes.INTEGER, unique: true, primaryKey: true},
        room: {type: DataTypes.STRING},
        idUser: {type: DataTypes.INTEGER},
        idFriend: {type: DataTypes.INTEGER},
      }
    )
  
    return ChatsModel
  }