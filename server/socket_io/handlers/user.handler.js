let users = []

function userHandlers(io, socket) {
  const { idUser } = socket.handshake.query
  // утилита для обновления списка пользователей
  const updateUserList = () => {
    // сообщение получают только пользователи, находящиеся в комнате
    io.emit('user_list:update', users)
  }
  // обрабатываем подключение нового пользователя
  socket.on('user:add', async (user) => {
    if (users.length === 0) {
      if (user !== null) {
        users.push(user)
      }
    } else {
      if (users.indexOf(user) === -1) {
        users.push(user)
      }
    }
    // // обновляем список пользователей
    updateUserList()
  })

    // обрабатываем отключения пользователя
  socket.on('disconnect', () => {
    // удаляем пользователя из массива
    let newArr = users.filter(user => user !== Number(idUser) && user)
    users = [...newArr]
    // обновляем список пользователей
    updateUserList()
  })
}

module.exports = userHandlers;