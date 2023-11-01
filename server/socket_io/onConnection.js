const userHandlers = require('./handlers/user.handler')
const messagesHandlers = require('./handlers/messages.handler')

function onConnection(io, socket) {
  // извлекаем идентификатор комнаты и имя пользователя
  const { idUser, roomId } = socket.handshake.query

  socket.roomId = roomId
  socket.idUser = idUser

  messagesHandlers(io, socket)
  userHandlers(io, socket)
}

module.exports = onConnection;