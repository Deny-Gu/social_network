const userHandlers = require('./handlers/user.handler')

function onConnection(io, socket) {
  // извлекаем идентификатор комнаты и имя пользователя
  const { idUser } = socket.handshake.query

  // записываем их в объект сокета
  socket.idUser = idUser

  // регистрируем обработчики для пользователей
  userHandlers(io, socket)
}

module.exports = onConnection;