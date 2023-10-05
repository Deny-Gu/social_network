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

    // async editRecord(id, message) {
    //   const records = await RecordsModel.update({ message: message },{ where: { id: id }});
    //   return records;
    // }
    
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

    // async editRecord(id, message) {
    //   const records = await RecordsModel.update({ message: message },{ where: { id: id }});
    //   return records;
    // }
    
    async removePhoto(id) {
      const photoImage  = await PhotoModel.destroy({ where: { id: id } });
      return photoImage ;
    }
}

module.exports = new AlbumsService();