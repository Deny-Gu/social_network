const { validationResult } = require('express-validator');
const userService = require('../service/user-service');
const RecordsService = require('../service/records-service');
const ApiError = require('../exceptions/api-error')

class UserController {
    async registration (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Неккоректный email или пароль.', errors.array()))
            }
            const {email, password} = req.body
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login (req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async activate (req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e)
        }
    }

    async refresh (req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    async getUsers (req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }

    async editUser (req, res, next) {
        try {
            const {email, firstname, lastname, birthday, city, education, phone, aboutMe} = req.body;
            const userData = await userService.editUser(email, firstname, lastname, birthday, city, education, phone, aboutMe);
            console.log(userData)
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getRecords (req, res, next) {
        try {
            const {idUser} = req.body;
            const records = await RecordsService.getAllRecords(idUser);
            return res.json(records)
        } catch (e) {
            next(e)
        }
    }

    async uploadImage (req, res, next) {
        try {
            const { email } = req.body;
            const { image } = req.files;
            await userService.editAvatar(email, image.name);
            if (!image) return res.sendStatus(400);
            if (/^image/.test(image.mimetype) === false) return res.sendStatus(400);
            image.mv('./uploads/' + image.name);
            return res.json(image.name)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();