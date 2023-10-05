const { DataTypes  } = require('sequelize')

module.exports = (sequelize) => {
    const PhotoModel = sequelize.define(
      'photo',
      {
        id: {type: DataTypes.INTEGER, unique: true, primaryKey: true},
        idUser: {type: DataTypes.INTEGER},
        idAlbum: {type: DataTypes.STRING},
        albumTitle: {type: DataTypes.STRING},
        photo: {type: DataTypes.STRING},
      }
    )
  
    return PhotoModel
  }