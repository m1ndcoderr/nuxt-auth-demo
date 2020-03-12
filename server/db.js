const { Pool } = require('pg')
const keys = require('./keys/index')

module.exports = class Database {
  constructor() {
    if (Database.instance) return Database.instance
    Database.instance = this
    Database.exists = true
    this.pool = new Pool({ connectionString: keys.DEV_DB, max: 5 })
  }

  async query(text, params) {
    try {
      return await this.pool.query(text, params)
    } catch (e) {
      console.log(`Database (db.js): ${e.message}`)
      return null
    }
  }
}
