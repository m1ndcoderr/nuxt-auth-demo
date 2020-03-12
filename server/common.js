const responseHelper = require('./helpers/response.helper')
const Database = require('./db')

module.exports = class Common {
  constructor() {
    this.rh = responseHelper
  }

  async query(text, params) {
    const db = new Database()
    const result = await db.query(text, params)
    return result
  }

  console(className, location, method, message) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`ERROR in ${className}, ${location}, ${method}: ${message}.`)
    }
  }
}
