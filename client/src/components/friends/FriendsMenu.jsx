import React, { useContext } from 'react';
import { Context } from "../..";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

function FriendsMenu () {
    const { store } = useContext(Context);
    let location = useLocation();

    return (
        <div className="friends-page-menu">
            <Link className={location.pathname === '/friends' ? 'friends-page-menu-active' : ''} to={'/friends'}>Мои друзья</Link>
            <Link className={location.pathname === '/friends-requests' ? 'friends-page-menu-active' : ''} to={'/friends-requests'}>Заявки в друзья {store.requestsIncoming.length > 0 && <span  className='requests-score'>{store.requestsIncoming.length}</span>}</Link>
            <Link className={location.pathname === '/friends-search' ? 'friends-page-menu-active' : ''} to={'/friends-search'}>Поиск друзей</Link>
        </div>
    )
};

export default observer(FriendsMenu);