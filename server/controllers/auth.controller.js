const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../keys/index')
const rh = require('../helpers/response.helper')
const { loginSchema, registerSchema } = require('../validation/auth.validation')

module.exports = class AuthController {
  constructor(userController) {
    this.userController = userController
  }

  /* Логин пользователя */
  async login(req, res) {
    const { email, password } = req.body

    // Если у нас прод, тогда применяем правила валидации:
    if (process.env.NODE_ENV === 'production') {
      const validateLogin = loginSchema.validate({ email, password })

      if (validateLogin.error)
        return rh.err400(res, validateLogin.error.message)
    }

    const result = await this.userController.getByEmail(email)
    if (result.length) {
      const match = await bcrypt.compare(password, result[0].password)
      if (!match) return rh.err400(res, 'Неверные данные.')
      if (match) {
        const token = await jwt.sign(
          { user: { userId: result[0].id, userRole: result[0].role } },
          keys.SERVER_JWT_KEY,
          {
            algorithm: 'HS512',
            expiresIn: '24h'
          }
        )

        res.cookie('token', token)
        req.session.userId = result[0].id
        req.session.userRole = result[0].role
        return res.sendStatus(200)
      }
    }

    return rh.err500(res)
  }

  /* Выйти (разлогинится) */
  logout(req, res) {
    req.session = null
    res.cookie('token', '', { expires: new Date(0) })
    return res.sendStatus(200)
  }

  /* Регистрация пользователя */
  async register(req, res) {
    const { email, password, repeat } = req.body

    // Если у нас прод, тогда применяем правила валидации:
    if (process.env.NODE_ENV === 'production') {
      const validateRegister = registerSchema.validate({
        email,
        password,
        repeat
      })

      if (validateRegister.error)
        return rh.err400(res, validateRegister.error.message)
    }

    const result = await this.userController.add(email, password)

    if (result.length) {
      const token = await jwt.sign(
        { user: { userId: result[0].id, userRole: result[0].role } },
        keys.SERVER_JWT_KEY,
        {
          algorithm: 'HS512',
          expiresIn: '24h'
        }
      )

      res.cookie('token', token)
      req.session.userId = result[0].id
      req.session.userRole = result[0].role
      return res.sendStatus(200)
    }

    return rh.err500(res)
  }
}
