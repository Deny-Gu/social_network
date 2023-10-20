const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('test', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
})

const FriendsModel = require('../models/friends-model')(sequelize);

class FriendsService {
    async getFriends(idUser) {
        const friends = await FriendsModel.findAll({ where: { idUser: idUser } });
        return friends;
    }

    async addFriend(idUser, idFriend) {
      const friend1 = await FriendsModel.create({ idUser, idFriend });
      const friend2 = await FriendsModel.create({ idUser: idFriend , idFriend: idUser });
      return friend1;
    }
    
    async removeFriend(id) {
      const friend = await FriendsModel.destroy({ where: { id: id } });
      return friend;
    }
}

module.exports = new FriendsService();