import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import { Context } from "../..";
import { AiOutlineSearch } from 'react-icons/ai';
import { BsPersonAdd } from 'react-icons/bs';

function FriendsSearch () {
    const { store } = useContext(Context);
    const [viewAddFriendIcon, setViewAddFriendIcon] = useState(null);

    return (
        <div className="friends-page-search">
            <div className="friends-page-search-header">
                <h4>Поиск друзей</h4>
            </div>
            <div className="friends-page-search-input">
                <input type="text" id="friend-search-input" placeholder="Ведите запрос" />
                <button id="friend-search-input-btn"><AiOutlineSearch fontSize={20} /></button>
            </div>
            <div className="friends-page-search-content">
                {store.users.map(user => {
                    if (store.user.id !== user.id) {
                        return (
                            <div className="friends-page-user" key={user.id}>
                                <div className="friends-page-user-photo">
                                    <Link to={`/id${user.id}`} onClick={() => store.setUserProfile(user)}><img src={store.API_URL_UPLOADS + user.email.split('@')[0] + "/avatar/" + user.avatar} alt='profile_img'></img></Link>
                                </div>
                                <div className="friends-page-user-info">
                                    <Link style={{float: 'left'}} to={`/id${user.id}`} onClick={() => store.setUserProfile(user)}>{user.firstname} {user.lastname}</Link>
                                    <Link style={{float: 'right'}} onMouseOver={() => setViewAddFriendIcon(user.id)} onMouseLeave={() => setViewAddFriendIcon(null)}><BsPersonAdd fontSize={20} /></Link>
                                    {viewAddFriendIcon === user.id && <div className="add-friend-icon">Добавить в друзья</div>}
                                </div>
                            </div>
                        )
                    }
                })}
            </div> 
        </div>
    )
};

export default observer(FriendsSearch);