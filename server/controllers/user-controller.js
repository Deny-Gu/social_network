const { validationResult } = require('express-validator');
const userService = require('../service/user-service');
const RecordsService = require('../service/records-service');
const ApiError = require('../exceptions/api-error');
const AlbumsService = require('../service/albums-service');
const RequestsService = require('../service/requests-service');
const FriendsService = require('../service/friends-service')
const fs = require('fs');
const path = require("path");
const ChatsService = require('../service/chats-service');
const MessagesService = require('../service/messages-service');

class UserController {
    async registration (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Неккоректный email или пароль.', errors.array()))
            }
            const {email, password} = req.body
            const userData = await userService.registration(email, password)
            fs.mkdir(`./uploads/${email.split('@')[0]}/`, {recursive: true}, err => {
                if(err) throw err; // не удалось создать папку
                console.log('Папка успешно создана');
             });
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
            fs.mkdir(`./uploads/${email.split('@')[0]}/avatar/`, {recursive: true}, err => {
                if(err) throw err; // не удалось создать папку
                console.log('Папка успешно создана');
             });
            image.mv(`./uploads/${email.split('@')[0]}/avatar/` + image.name);
            return res.json(image.name)
        } catch (e) {
            next(e)
        }
    }

    async removeAvatar (req, res, next) {
        try {
            const { email } = req.body;
            await userService.removeAvatar(email);
            return res.json(email)
        } catch (e) {
            next(e)
        }
    }

    async addRecords (req, res, next) {
        try {
            const { idUser, idFrom, date, message } = req.body;
            const userMessage = await RecordsService.addRecords(idUser, idFrom, date, message);
            return res.json(userMessage)
        } catch (e) {
            next(e)
        }
    }

    async removeRecord (req, res, next) {
        try {
            const { id } = req.body;
            const record = await RecordsService.removeRecord(id);
            return res.json(record)
        } catch (e) {
            next(e)
        }
    }

    async editRecord (req, res, next) {
        try {
            const { id, message } = req.body;
            const record = await RecordsService.editRecord(id, message);
            return res.json(record)
        } catch (e) {
            next(e)
        }
    }

    async getAlbums (req, res, next) {
        try {
            const {idUser} = req.body;
            const albums = await AlbumsService.getAlbums(idUser);
            return res.json(albums)
        } catch (e) {
            next(e)
        }
    }

    async addAlbum (req, res, next) {
        try {
            const { email, idUser, albumTitle } = req.body;
            const album = await AlbumsService.addAlbum(idUser, albumTitle);
            fs.mkdir(`./uploads/${email.split('@')[0]}/albums/`, {recursive: true}, err => {
                if(err) throw err; // не удалось создать папку
                console.log('Папка успешно создана');
             });
             fs.mkdir(`./uploads/${email.split('@')[0]}/albums/${albumTitle}`, {recursive: true}, err => {
                if(err) throw err; // не удалось создать папку
                console.log('Папка успешно создана');
             });
            return res.json(album)
        } catch (e) {
            next(e)
        }
    }

    async removeAlbum (req, res, next) {
        try {
            const { id, email, albumTitle } = req.body;
            const album = await AlbumsService.removeAlbum(id);

            fs.readdir(`./uploads/${email.split('@')[0]}/albums/` + albumTitle, (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    AlbumsService.removePhotoAlbum(albumTitle, file)
                  fs.unlink(path.join(`./uploads/${email.split('@')[0]}/albums/` + albumTitle, file), (err) => {
                    if (err) throw err;
                  });
                }
                return fs.rmdir(`./uploads/${email.split('@')[0]}/albums/` + albumTitle, err => {
                    if(err) throw err;
                    console.log('Папка успешно удалена');
                 });
              });

            return res.json(album)
        } catch (e) {
            next(e)
        }
    }

    async getPhoto (req, res, next) {
        try {
            const {idUser} = req.body;
            const albums = await AlbumsService.getPhoto(idUser);
            return res.json(albums)
        } catch (e) {
            next(e)
        }
    }

    async addPhoto (req, res, next) {
        try {
            const { email, idUser, idAlbum, albumTitle } = req.body;
            const { image } = req.files;

            await AlbumsService.addPhoto(idUser, idAlbum, albumTitle, image.name)
            if (!image) return res.sendStatus(400);
            if (/^image/.test(image.mimetype) === false) return res.sendStatus(400);
            image.mv(`./uploads/${email.split('@')[0]}/albums/${albumTitle}/` + image.name);
            return res.json(image.name)
        } catch (e) {
            next(e)
        }
    }

    async removePhoto (req, res, next) {
        try {
            const { id, email, albumTitle, namePhoto } = req.body;
            const image = await AlbumsService.removePhoto(id);
            fs.unlink(`./uploads/${email.split('@')[0]}/albums/${albumTitle}/${namePhoto}`, err => {
                if(err) throw err;
                console.log('Файл успешно удалён');
             });
            return res.json(image)
        } catch (e) {
            next(e)
        }
    }

    async editCover (req, res, next) {
        try {
            const { id, cover } = req.body;
            const albumCover = await AlbumsService.editCover(id, cover);
            return res.json(albumCover)
        } catch (e) {
            next(e)
        }
    }

    async editAlbumTitle (req, res, next) {
        try {
            const { id, email, oldAlbumTitle, albumTitle } = req.body;
            const album = await AlbumsService.editAlbumTitle(id, albumTitle);

            fs.readdir(`./uploads/${email.split('@')[0]}/albums/` + oldAlbumTitle, (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    AlbumsService.editAlbumTitlePhoto(file, oldAlbumTitle, albumTitle)
                }
              });

            fs.rename(`./uploads/${email.split('@')[0]}/albums/` + oldAlbumTitle, `./uploads/${email.split('@')[0]}/albums/` + albumTitle, (err) => {
                if (err) throw err;
                console.log('renamed complete');
              });

            return res.json(album)
        } catch (e) {
            next(e)
        }
    }

    async getRequestsIncoming (req, res, next) {
        try {
            const {idUserTo} = req.body;
            const requests = await RequestsService.getRequestsIncoming(idUserTo);
            return res.json(requests)
        } catch (e) {
            next(e)
        }
    }

    async getRequestsOutgoing (req, res, next) {
        try {
            const {idUserFrom} = req.body;
            const requests = await RequestsService.getRequestsOutgoing(idUserFrom);
            return res.json(requests)
        } catch (e) {
            next(e)
        }
    }

    async addRequests (req, res, next) {
        try {
            const { idUserFrom, idUserTo } = req.body;
            const album = await RequestsService.addRequests(idUserFrom, idUserTo);
            return res.json(album)
        } catch (e) {
            next(e)
        }
    }

    async removeRequests (req, res, next) {
        try {
            const { id } = req.body;
            const requests = await RequestsService.removeRequests(id);
            return res.json(requests)
        } catch (e) {
            next(e)
        }
    }

    async getFriends (req, res, next) {
        try {
            const {idUser} = req.body;
            const friends = await FriendsService.getFriends(idUser);
            return res.json(friends)
        } catch (e) {
            next(e)
        }
    }

    async addFriend (req, res, next) {
        try {
            const { idUser, idFriend } = req.body;
            const friend = await FriendsService.addFriend(idUser, idFriend);
            return res.json(friend)
        } catch (e) {
            next(e)
        }
    }

    async removeFriend (req, res, next) {
        try {
            const { id } = req.body;
            const friend = await FriendsService.removeFriend(id);
            return res.json(friend)
        } catch (e) {
            next(e)
        }
    }

    async getChats (req, res, next) {
        try {
            const {idUser} = req.body;
            const chats = await ChatsService.getChats(idUser);
            return res.json(chats)
        } catch (e) {
            next(e)
        }
    }

    async getMessages (req, res, next) {
        try {
            const {room} = req.body;
            const messages = await MessagesService.getMessages(room);
            return res.json(messages)
        } catch (e) {
            next(e)
        }
    }

    async addMessages (req, res, next) {
        try {
            const { room, idUser, message } = req.body;
            const messages = await MessagesService.addMessages(room, idUser, message);
            return res.json(messages)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();