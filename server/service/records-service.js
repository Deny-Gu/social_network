const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail.service')
const TokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const { Sequelize } = require('sequelize')
const ApiError = require('../exceptions/api-error')
const tokenService = require('./token-service')

const sequelize = new Sequelize('test', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

const RecordsModel = require('../models/records-model')(sequelize);

class RecordsService {
    async getAllRecords(idUser) {
        const records = await RecordsModel.findAll({ where: { idUser: idUser } });
        return records;
    }

    async addRecords(idUser, idFrom, date, message) {
      const records = await RecordsModel.create({ idUser, idFrom, date, message });
      return records;
    }

    async editRecord(id, message) {
      const records = await RecordsModel.update({ message: message },{ where: { id: id }});
      return records;
    }
    
    async removeRecord(id) {
      const records = await RecordsModel.destroy({ where: { id: id } });
      return records;
    }
}

module.exports = new RecordsService();