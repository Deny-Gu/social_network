const ChatsService = require('../../service/chats-service')
const MessagesService = require('../../service/messages-service')

let chatsRoom = {}
let messages = {}

async function messagesHandlers(io, socket) {
    const { idUser } = socket.handshake.query

    const chats = await ChatsService.getChats(idUser);

    chats.map(chat => {
        if (!chatsRoom[chat.room]) {
            chatsRoom[chat.room] = [];
            messages[chat.room] = [];
        }
    })

    const updateUserRoomList = () => {
        chats.map(chat => { 
            if (chat.idUser === Number(idUser)) {
                io.to(chat.room).emit('user_room_list:update', chatsRoom[chat.room])
            }
        })
    }

    socket.on('user_room:add', async (user) => {
        chats.map(chat => { 
            if (chat.idUser === user) {
                if (!chatsRoom[chat.room].includes(user)) {
                    chatsRoom[chat.room].push(user)
                    socket.join(chat.room)
                }
            } else {
                chatsRoom[chat.room].push(user)
                socket.join(chat.room)
            }
        })
        updateUserRoomList()
    })

    const updateMessageList = () => {
        chats.map(chat => { 
            if (chat.idUser === Number(idUser)) {
                io.to(chat.room).emit('message_list:update', {[chat.room]: messages[chat.room]})
            }
        })
    }

        socket.on('message:add', (message) => {
            messages[message.room].push(message)

        updateMessageList()
    })

    socket.on('message:get', async () => {
        try {
            for (let keys in chatsRoom) {
                const _messages = await MessagesService.getMessages(keys);
                messages[keys] = _messages
            }
            updateMessageList()
        } catch (e) {
            onError(e)
        }
    })

    socket.on('disconnect', () => {
        for (let keys in chatsRoom) {
            let newArrChat = chatsRoom[keys].filter(user => user !== Number(idUser) && user)
            chatsRoom[keys] = [...newArrChat]
        }
        updateUserRoomList()
        updateMessageList()
    })

}

module.exports = messagesHandlers;