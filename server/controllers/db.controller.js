const Common = require('../common')
const UserController = require('../controllers/user.controller')

module.exports = class DatabaseController extends Common {
  constructor() {
    super()
    this.location = '/controllers/db.controller.js'
    this.className = 'DatabaseController'
  }

  // Создание таблицы пользователей:
  async createUsers() {
    try {
      await this.query(
        `CREATE TABLE IF NOT EXISTS users
              (id BIGSERIAL PRIMARY KEY,
               email TEXT NOT NULL UNIQUE,
               role TEXT NOT NULL DEFAULT 'USER',
               password TEXT NOT NULL)`
      )

      // Добавим двух пользователей в базу:
      const uc = new UserController()

      // Обычный юзер:
      await uc.add('user@user.com', '091772Abc')

      // Admin:
      const admin = await uc.add('admin@admin.com', '091772Abc')
      if (admin.length) {
        await this.query("UPDATE users SET role = 'ADMIN' WHERE id = $1", [
          admin[0].id
        ])
      }
    } catch (e) {
      this.console(this.className, this.location, 'createUsers', e.message)
    }
  }

  // Создаем необходимые таблицы:
  async createTables() {
    await this.createUsers()
  }
}
