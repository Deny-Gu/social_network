const { DataTypes  } = require('sequelize')

module.exports = (sequelize) => {
    const AlbumsModel = sequelize.define(
      'albums',
      {
        id: {type: DataTypes.INTEGER, unique: true, primaryKey: true},
        idUser: {type: DataTypes.INTEGER},
        albumTitle: {type: DataTypes.STRING},
        cover: {type: DataTypes.STRING},
      }
    )
  
    return AlbumsModel
  }