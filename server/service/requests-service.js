const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('test', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

const RequestsModel = require('../models/requests-model')(sequelize);

class RequestsService {
    async getRequestsIncoming(idUserTo) {
        const requestsIncoming = await RequestsModel.findAll({ where: { idUserTo: idUserTo } });
        return requestsIncoming;
    }

    async getRequestsOutgoing(idUserFrom) {
        const requestsOutgoing = await RequestsModel.findAll({ where: { idUserFrom: idUserFrom } });
        return requestsOutgoing;
    }

    async addRequests(idUserFrom, idUserTo) {
      const requests = await RequestsModel.create({ idUserFrom, idUserTo, accept: false });
      return requests;
    }
    
    async removeRequests(id) {
      const Requests = await RequestsModel.destroy({ where: { id: id } });
      return Requests;
    }
}

module.exports = new RequestsService();