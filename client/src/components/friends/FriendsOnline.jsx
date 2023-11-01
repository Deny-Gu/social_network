import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { Link } from "react-router-dom";

function FriendsOnline () {
    const { store } = useContext(Context);

    return (
        <div className='friends-all'>
            {store.usersOnline.length > 1 ? 
                <div>
                    {store.friends.map(friend => {
                        return store.usersOnline.map(userOnline => {
                            if (friend.id === userOnline) {
                                return (
                                    <div className="friends-incoming-user-wrapper" key={friend.id}>
                                    <div className="friends-incoming-user">
                                        <div className="friends-incoming-user-avatar">
                                            <img src={store.API_URL_UPLOADS + friend.email.split('@')[0] + "/avatar/" + friend.avatar} alt='profile_img' />
                                        </div>
                                        <div className="friends-incoming-user-content">
                                            <Link style={{float: 'left'}} to={`/id${friend.id}`} onClick={() => store.setUserProfile(friend)}>{friend.firstname} {friend.lastname}</Link>
                                            <button id="friends-incoming-user-accept">Написать сообщение</button>
                                        </div>
                                        <div className="friends-incoming-user-online">
                                            {store.usersOnline.map(user => user === friend.id && <p key={user}><span className='online' />Online</p>)}
                                        </div>
                                    </div>
                                    <div className="line"></div>
                                </div>
                                )
                            }
                            return null
                        })
                    })}
                </div> :
                <span>Друзей нет в сети...</span>
            }
        </div>
    )
};

export default observer(FriendsOnline);