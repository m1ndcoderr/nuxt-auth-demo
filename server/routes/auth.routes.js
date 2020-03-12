const { Router } = require('express')
const AuthController = require('../controllers/auth.controller')
const UserController = require('../controllers/user.controller')
const DatabaseController = require('../controllers/db.controller')
const router = Router()

const auth = new AuthController(new UserController(new DatabaseController()))

router.post('/login', (req, res) => auth.login(req, res))
router.post('/register', (req, res) => auth.register(req, res))
router.post('/logout', (req, res) => auth.logout(req, res))

module.exports = router
