const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('test', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

const MessagesModel = require('../models/messages-model')(sequelize);

class MessagesService {
    async getMessages(room) {
        const messasges = await MessagesModel.findAll({ where: { room: room } });
        return messasges;
    }

    async addMessages(room, idUser, message) {
      const messasges = await MessagesModel.create({ room, idUser, message });
      return messasges;
    }

    // async editRecord(id, message) {
    //   const records = await RecordsModel.update({ message: message },{ where: { id: id }});
    //   return records;
    // }
    
    // async removeRecord(id) {
    //   const records = await RecordsModel.destroy({ where: { id: id } });
    //   return records;
    // }
}

module.exports = new MessagesService();