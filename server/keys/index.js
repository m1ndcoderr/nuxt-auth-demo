module.exports =
  process.env.NODE_ENV === 'production'
    ? require('./keys.prod')
    : require('./keys.dev')
