const { DataTypes  } = require('sequelize')

module.exports = (sequelize) => {
  const UserModel = sequelize.define(
    'users',
    {
      email: {type: DataTypes.STRING, unique: true, required: true},
      password: {type: DataTypes.STRING, required: true},
      isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
      activationLink: {type: DataTypes.STRING},
      firstname: {type: DataTypes.STRING},
      lastname: {type: DataTypes.STRING},
      birthday: {type: DataTypes.DATE},
      city: {type: DataTypes.STRING},
      education: {type: DataTypes.STRING},
      phone: {type: DataTypes.STRING},
      aboutMe: {type: DataTypes.STRING},
      avatar: {type: DataTypes.STRING},
    }
  )

  return UserModel
}
