const Router = require('express').Router
const UserController = require('../controllers/user-controller')
const router = new Router()
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware.js')

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 6, max: 32}),
    UserController.registration
    )
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/users', authMiddleware, UserController.getUsers)
router.post('/user-edit', UserController.editUser)
router.post('/records', UserController.getRecords)
router.post('/upload', UserController.uploadImage)
router.post('/removeAvatar', UserController.removeAvatar)
router.post('/add-record', UserController.addRecords)
router.post('/remove-record', UserController.removeRecord)
router.post('/edit-record', UserController.editRecord)
router.post('/get-albums', UserController.getAlbums)
router.post('/add-album', UserController.addAlbum)
router.post('/remove-album', UserController.removeAlbum)
router.post('/get-photo', UserController.getPhoto)
router.post('/add-photo', UserController.addPhoto)
router.post('/remove-photo', UserController.removePhoto)


module.exports = router