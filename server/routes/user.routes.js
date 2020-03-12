const { Router } = require('express')
const authMiddleware = require('../middlewares/auth')
const UserController = require('../controllers/user.controller')

const router = Router()

/* Получение авторизованного пользователя. */
router.get('/get-authorized', (req, res) =>
  new UserController().getAuthorized(req, res)
)

/* Получение списка всех пользователей. */
router.get('/list-all', authMiddleware.verifyAdmin, (req, res) =>
  new UserController().listAll(res)
)

module.exports = router
