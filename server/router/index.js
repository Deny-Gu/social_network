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


module.exports = router