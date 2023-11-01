import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import { Context } from "../..";
import { observer } from 'mobx-react-lite';

function MessagesList () {
    const { store } = useContext(Context);

    return (
        <div className="message-list-wrapper">
            <div className="message-list">
                {store.chats.map(chat => {
                    return store.users.map(user => {
                                if (user.id === chat.idFriend) {
                                    return (
                                        <Link to={`/messages-room/${chat.room}`} onClick={() => store.setChatRoom(chat)} key={chat.id}>
                                            <div className="message-list-item">
                                                <div className="message-list-item-user-avatar">
                                                    <img src={store.API_URL_UPLOADS + user.email.split('@')[0] + "/avatar/" + user.avatar} alt='profile_img' />
                                                </div>
                                                <div className="message-list-item-user-content">
                                                    <h3>{user.firstname} {user.lastname}</h3>
                                                    <p>{store.chatsMessages[chat.room][store.chatsMessages[chat.room].length - 1].message}</p>
                                                </div>
                                                <div className="message-list-item-user-online">
                                                    {store.usersOnline.map(userOnline => userOnline === user.id && <p key={userOnline}><span className='online-chat' /></p>)}
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                }
                                return null
                            })}
                )}
            </div>
        </div>
    )
};

export default observer(MessagesList);