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

const UserModel = require('../models/user-model')(sequelize);

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ where: { email: email } });

        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await UserModel.create({email, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = TokenService.generationTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ where: { activationLink: activationLink } });
        
        if (!user) {
            throw ApiError.BadRequest(`Неккоректная ссылка активации`)
        }

        user.isActivated = true;
        user.save();        
    }

    async login (email, password) {
        const user = await UserModel.findOne({ where: { email: email } });       
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с таким email не найден`)
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest(`Неверный пароль`)
        }

        const userDto = new UserDto(user)
        const tokens = TokenService.generationTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findByPk(userData.id)
        const userDto = new UserDto(user)
        const tokens = TokenService.generationTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        const users = await UserModel.findAll();
        return users;
    }

    async editUser(email, firstname, lastname,birthday, city, education, phone, aboutMe) {
        const userEdit = await UserModel.update({ firstname: firstname, lastname: lastname, birthday: birthday, city: city, education: education, phone: phone, aboutMe: aboutMe }, { where: { email: email } });
        const user = await UserModel.findOne({ where: { email: email } });
        const userDto = new UserDto(user)
        return {user: userDto};
    }

    async editAvatar(email, avatar) {
        const user = await UserModel.update({ avatar: avatar }, { where: { email: email } });
        return user;
    }

    async removeAvatar(email) {
        const user = await UserModel.update({ avatar: null }, { where: { email: email } });
        return user;
    }
}

module.exports = new UserService();