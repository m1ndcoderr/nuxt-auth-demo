const jwt = require('jsonwebtoken')
const keys = require('../keys/index')
const rh = require('../helpers/response.helper')

const DatabaseController = require('../controllers/db.controller')

module.exports.verifyUser = (req, res, next) => {
  if (!req.session.userId || !req.session.userRole) {
    const token = req.cookies.token
    if (!token) return rh.err401(res)

    jwt.verify(token, keys.SERVER_JWT_KEY, async (err, decoded) => {
      if (err) return rh.err401(res)

      const result = await new DatabaseController().query(
        'SELECT id, role FROM users WHERE id = $1',
        [decoded.user.userId]
      )

      if (!result.rowCount) return rh.err401(res)

      req.session.userId = result.rows[0].id
      req.session.userRole = result.rows[0].role
      next()
    })
  } else next()
}

// Проверяем, что пользователь является админом:
module.exports.verifyAdmin = (req, res, next) => {
  if (req.session && req.session.userRole && req.session.userRole !== 'ADMIN') {
    return rh.err403(res)
  } else if (!req.session.userId || !req.session.userRole) {
    const token = req.cookies.token
    if (!token) return rh.err401(res)

    jwt.verify(token, keys.SERVER_JWT_KEY, async (err, decoded) => {
      if (err) return rh.err401(res)

      const result = await new DatabaseController().query(
        'SELECT id, role FROM users WHERE id = $1',
        [decoded.user.userId]
      )

      if (!result.rowCount) return rh.err401(res)
      if (result.rows[0].role !== 'ADMIN') return rh.err403(res)

      req.session.userId = result.rows[0].id
      req.session.userRole = result.rows[0].role
      next()
    })
  } else next()
}
