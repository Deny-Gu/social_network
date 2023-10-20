const { DataTypes  } = require('sequelize')

module.exports = (sequelize) => {
    const RequestsModel = sequelize.define(
      'requests',
      {
        id: {type: DataTypes.INTEGER, unique: true, primaryKey: true},
        idUserFrom: {type: DataTypes.INTEGER},
        idUserTo: {type: DataTypes.INTEGER},
        accept: {type: DataTypes.BOOLEAN},
      }
    )
  
    return RequestsModel
  }