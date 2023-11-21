import React, { useContext } from "react";
import { Link } from "react-router-dom"
import { Context } from "../..";
import { observer } from 'mobx-react-lite';

function MessagesFriends () {
    const { store } = useContext(Context);

    return (
        <div className="message-friends-wrapper">
            <div className="message-friends-title">
                <h4>Друзья</h4>
            </div>
            <div className="message-friends-all">
                <div className='message-friends-all'>
                    {store.friends.length > 0 ? 
                        <div>
                            {store.friends.map(friend => {
                                return (
                                    <div className="message-friends-all-user-wrapper" key={friend.id}>
                                        <div className="message-friends-all-user">
                                            <div className="message-friends-all-user-avatar">
                                                <img src={store.API_URL_UPLOADS + friend.email.split('@')[0] + "/avatar/" + friend.avatar} alt='profile_img' />
                                            </div>
                                            <div className="message-friends-all-user-content">
                                                <Link style={{float: 'left'}} to={`/id${friend.id}`} onClick={() => store.setUserProfile(friend)}>{friend.firstname} {friend.lastname}</Link>
                                                {store.chats.map(chat => {
                                                    if (chat.idFriend === friend.id) {
                                                        return (
                                                            <Link to={`/messages-room/${chat.room}`} onClick={() => store.setChatRoom(chat)} key={chat.id}><button id="message-friends-all-user-accept">Написать сообщение</button></Link>
                                                        )
                                                    }
                                                    return null
                                                })}
                                                {/* <button id="message-friends-all-user-accept">Написать сообщение</button> */}
                                            </div>
                                            <div className="message-friends-all-user-online">
                                                {store.usersOnline.map(user => user === friend.id && <p key={user}><span className='online-messages' /></p>)}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div> :
                        <span>У вас нет друзей...</span>}
                </div>
            </div>
        </div>
    )
};

export default observer(MessagesFriends);