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
}

module.exports = new RecordsService();