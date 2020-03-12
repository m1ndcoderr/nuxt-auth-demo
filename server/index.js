const { Nuxt, Builder } = require('nuxt')

const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const DatabaseController = require('./controllers/db.controller')

const app = require('./app')

async function start() {
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(nuxt.render)

  app.listen(port, host, async () => {
    await new DatabaseController().createTables()
    console.log(`Server listening on http://${host}:${port}`)
  })
}
start()
