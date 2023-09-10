const { DataTypes  } = require('sequelize')

module.exports = (sequelize) => {
  const TokenSchema = sequelize.define(
    'tokens',
    {
      user: {type: DataTypes.STRING, ref: 'User'},
      refreshToken: {type: DataTypes.STRING, required: true}
    }
  )

  return TokenSchema
}