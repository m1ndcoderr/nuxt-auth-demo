module.exports.err500 = (res, msg) => {
  const message = msg || 'Неизвестная ошибка сервера.'
  return res.status(500).json({ message })
}

module.exports.err400 = (res, msg) => {
  const message = msg || 'Неизвестная ошибка клиента.'
  return res.status(400).json({ message })
}

module.exports.err401 = (res, msg) => {
  const message = msg || 'Вы не авторизованы.'
  return res.status(401).json({ message })
}

module.exports.err403 = (res, msg) => {
  const message = msg || 'Доступ запрещен.'
  return res.status(403).json({ message })
}
