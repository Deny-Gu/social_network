import React, { useState } from 'react';
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import FriendsAll from "./FriendsAll";
import FriendsOnline from './FriendsOnline';

function FriendsList () {
    const [tab, setTab] = useState('all');

    return (
        <div className="friends-page-list">
            <div className="friends-page-list-header">
                <Link id="friends-all-btn" className={tab === 'all' ? 'friends-all-btn-active' : ''} onClick={() => setTab('all')}>Все друзья</Link>
                <Link id="friends-online-btn" className={tab === 'online' ? 'friends-all-btn-active' : ''} onClick={() => setTab('online')}>Друзья онлайн</Link>
                <Link to={'/friends-search'} id="friends-search-btn">Найти друзей</Link>
            </div>
            <div className="line"></div>
            <div className="friends-page-list-content">
                {tab === 'all' ? <FriendsAll /> : <FriendsOnline />}
            </div>  
        </div>
    )
};

export default observer(FriendsList);