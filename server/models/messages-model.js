const { DataTypes  } = require('sequelize')

module.exports = (sequelize) => {
    const MessagesModel = sequelize.define(
      'messages',
      {
        id: {type: DataTypes.INTEGER, unique: true, primaryKey: true},
        room: {type: DataTypes.STRING},
        idUser: {type: DataTypes.INTEGER},
        message: {type: DataTypes.STRING},
      }
    )
  
    return MessagesModel
  }