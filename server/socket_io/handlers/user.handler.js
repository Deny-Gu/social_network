let users = []
let socketsId = []

function userHandlers(io, socket) {
  const { idUser } = socket.handshake.query

  const updateUserList = () => {
    io.emit('user_list:update', users)
  }

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
    socketsId.push(socket.id)

    updateUserList()
  })

  socket.on('disconnect', () => {
    let newSockets = socketsId.filter(s => s !== socket.id && s)
    socketsId = [...newSockets]

    let newArr = users.filter(user => user !== Number(idUser) && user)
    users = [...newArr]

    updateUserList()
  })
}

module.exports = userHandlers;