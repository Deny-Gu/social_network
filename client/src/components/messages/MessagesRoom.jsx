import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import { io } from 'socket.io-client'

function MessagesRoom () {
    const { store } = useContext(Context);
    const [message, setMessage] = useState('')

    const socket = io('http://localhost:5000', {
      query: {
        idUser: store.user.id,
        roomId: store.chatRoom.room
      }
    })

    const sendMessage = () => {
        const dataMessage = {
            room: store.chatRoom.room,
            idUser: store.user.id,
            message: message,
            createdAt: new Date()
        }
        store.addMessages(dataMessage.room, dataMessage.idUser, dataMessage.message)
        socket.emit('message:add', dataMessage)
        setMessage('')
    }

    return (
        <div className="messages-room-wrapper">
                {store.users.map(user => {
                    if (user.id === store.chatRoom.idFriend) {
                        return (
                            <div className="messages-room-header" key={user.id}>
                                <div className="messages-room-title">
                                    <h4>{user.firstname} {user.lastname}</h4>
                                </div>
                                <div className="messages-room-avatar" key={user.id}>
                                    <img src={store.API_URL_UPLOADS + user.email.split('@')[0] + "/avatar/" + user.avatar} alt='profile_img' />
                                </div>
                            </div>
                        )
                    }
                    return null
                })}
            <div className="messages-room-content" onLoad={(e) => e.currentTarget.scrollTop = 999}>
                {store.chatsMessages[store.chatRoom.room].map(msg => {
                    return store.users.map(user => {
                            if (user.id === msg.idUser) {
                                return (
                                    <div className="messages-item" key={msg.id}>
                                        <div className="messages-room-avatar" key={msg.id}>
                                            <img src={store.API_URL_UPLOADS + user.email.split('@')[0] + "/avatar/" + user.avatar} alt='profile_img' />
                                        </div>
                                        <div className="messages-item-content">
                                            <h4><Link to={`/id${user.id}`}>{user.firstname}</Link></h4>
                                            <p>{msg.message}</p>
                                        </div>
                                        <p className="messages-item-date">{msg.createdAt.split('T').join(' ').split('.')[0]}</p>
                                    </div>
                                )
                            }
                            return null
                        })}
                    )
                }
            </div>
            <div className="messages-room-footer">
                <input type="text" id="messages-room-input" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Напишите сообщение..." />
                <button id="messages-room-btn-send" onClick={() => {sendMessage()}}>Отправить</button>
            </div>
        </div>
    )
};

export default observer(MessagesRoom);