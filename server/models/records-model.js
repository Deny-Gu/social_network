const { DataTypes  } = require('sequelize')

module.exports = (sequelize) => {
  const RecordsModel = sequelize.define(
    'records',
    {
      id: {type: DataTypes.INTEGER, unique: true, primaryKey: true},
      idUser: {type: DataTypes.STRING},
      idFrom: {type: DataTypes.STRING},
      date: {type: DataTypes.DATE},
      message: {type: DataTypes.STRING},
    }
  )

  return RecordsModel
}