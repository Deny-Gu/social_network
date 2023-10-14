const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('test', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

const AlbumsModel = require('../models/albums-model')(sequelize);
const PhotoModel = require('../models/photo-model')(sequelize);

class AlbumsService {
    async getAlbums(idUser) {
        const albums = await AlbumsModel.findAll({ where: { idUser: idUser } });
        return albums;
    }

    async addAlbum(idUser, albumTitle) {
      const albums = await AlbumsModel.create({ idUser, albumTitle });
      return albums;
    }
    
    async removeAlbum(id) {
      const albums = await AlbumsModel.destroy({ where: { id: id } });
      return albums;
    }

    async getPhoto(idUser) {
      const photoImage  = await PhotoModel.findAll({ where: { idUser: idUser } });
      return photoImage ;
  }

    async addPhoto(idUser, idAlbum, albumTitle, photo) {
      const photoImage = await PhotoModel.create({ idUser, idAlbum, albumTitle, photo });
      return photoImage;
    }

    async removePhoto(id) {
      const photoImage  = await PhotoModel.destroy({ where: { id: id } });
      return photoImage ;
    }

    async removePhotoAlbum(albumTitle, photo) {
      const photoImage  = await PhotoModel.destroy({ where: { albumTitle: albumTitle, photo: photo } });
      return photoImage ;
    }

    async editCover(id, cover) {
      const albumCover = await AlbumsModel.update({ cover: cover },{ where: { id: id }});
      return albumCover;
    }

    async editAlbumTitle(id, albumTitle) {
      const album = await AlbumsModel.update({ albumTitle: albumTitle },{ where: { id: id }});
      return album;
    }

    async editAlbumTitlePhoto(photo, oldAlbumTitle, albumTitle) {
      const albumPhoto = await PhotoModel.update({ albumTitle: albumTitle },{ where: { albumTitle: oldAlbumTitle, photo: photo }});
      return albumPhoto;
    }

}

module.exports = new AlbumsService();