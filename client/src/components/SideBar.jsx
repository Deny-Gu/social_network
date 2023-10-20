import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from ".."
import { Link } from "react-router-dom";
import { FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineUsers } from 'react-icons/hi';
import { BiMessageDetail } from 'react-icons/bi';
import { HiOutlinePhoto } from 'react-icons/hi2';

function SideBar() {
    const { store } = useContext(Context);

    return (
        <div id="sidebar">
            <div className="sidebar-wrapper">
                <nav>
                    <ul>
                        <li>
                            <span className="sidebar_icon">
                                <FaRegUserCircle />
                            </span>
                            <Link to={`/id${store.user.id}`} onClick={() => {store.setUserProfile(store.user); store.getRecords(store.user.id)}}>Моя страница</Link>
                        </li>
                        <li>
                            <span className="sidebar_icon">
                                <HiOutlineUsers />
                            </span>
                            <Link to="/friends">Друзья</Link>
                            {store.requestsIncoming.length > 0 && <span className='requests-score'>{store.requestsIncoming.length}</span>}
                        </li>
                        <li>
                            <span className="sidebar_icon">
                                <BiMessageDetail />
                            </span>
                            <Link to="/">Сообщения</Link>
                        </li>
                        <li>
                            <span className="sidebar_icon">
                                <HiOutlinePhoto />
                            </span>
                            <Link to="/photo">Фотографии</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default observer(SideBar);