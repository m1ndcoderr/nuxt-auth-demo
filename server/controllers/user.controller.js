const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const Common = require('../common')

module.exports = class UserController extends Common {
  constructor() {
    super()
    this.location = '/controllers/user.controller.js'
    this.className = 'UserController'
  }
  git
  /* Добавление нового пользователя в базу данных. */
  async add(email, password) {
    if (email && password) {
      try {
        const salt = await bcrypt.genSalt(8)
        const hashedPassword = await bcrypt.hash(password, salt)

        const result = await this.query(
          'INSERT INTO users (email, password) VALUES (LOWER($1), $2) ON CONFLICT (email) DO NOTHING RETURNING *',
          [email, hashedPassword]
        )
        if (result.rowCount) return result.rows
      } catch (e) {
        this.console(this.className, this.location, 'add', e.message)
      }
    }
    return []
  }

  /* Получить пользователя по id. */
  async getById(id) {
    try {
      const result = await this.query(
        'SELECT * FROM users WHERE id = $1 LIMIT 1',
        [id]
      )
      if (result.rowCount) return result.rows[0]
    } catch (e) {
      this.console(this.className, this.location, `getById(${id})`, e.message)
    }
    return {}
  }

  /* Получить пользователя по email. */
  async getByEmail(email) {
    try {
      const result = await this.query(
        'SELECT * FROM users WHERE email = $1 LIMIT 1',
        [email]
      )
      if (result.rowCount) return result.rows
    } catch (e) {
      this.console(
        this.className,
        this.location,
        `getByEmail(${email})`,
        e.message
      )
    }
    return []
  }

  /* Получить авторизованного пользователя. */
  async getAuthorized(req, res) {
    if (!req.session.userId) {
      jwt.verify(
        req.cookies.token,
        keys.SERVER_JWT_KEY,
        async (err, decoded) => {
          if (err) return this.rh.err401(res)
          req.session.userId = decoded.user.userId
          const user = await this.getById(req.session.userId)
          if (!Object.keys(user).length) return this.rh.err401(res)
          return res.json({ user })
        }
      )
    } else {
      const user = await this.getById(req.session.userId)
      if (!Object.keys(user).length) return this.rh.err401(res)
      return res.json({ user })
    }
  }

  /* Получить список всех пользователей. */
  async listAll(res) {
    try {
      const result = await this.query('SELECT * FROM users')
      if (result.rowCount) return res.json(result.rows)
    } catch (e) {
      this.console(this.className, this.location, 'listAll', e.message)
    }
    return this.rh.err500(res)
  }
}
