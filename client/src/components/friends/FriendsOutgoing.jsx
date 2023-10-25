import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { Link } from "react-router-dom";

function FriendsOutgoing () {
    const { store } = useContext(Context);

    if (store.requestsOutgoing.length > 0) {
        return store.requestsOutgoing.map(requests => {
            for (let i = 0; i < store.users.length; i++) {
                if (requests.idUserTo === store.users[i].id) {
                    return (
                        <div className="friends-incoming-user-wrapper" key={requests.id}>
                            <div className="friends-incoming-user">
                                <div className="friends-incoming-user-avatar">
                                    <img src={store.API_URL_UPLOADS + store.users[i].email.split('@')[0] + "/avatar/" + store.users[i].avatar} alt='profile_img' />
                                </div>
                                <div className="friends-incoming-user-content">
                                    <Link style={{float: 'left'}} to={`/id${store.users[i].id}`} onClick={() => store.setUserProfile(store.users[i])}>{store.users[i].firstname} {store.users[i].lastname}</Link>
                                    <button id="friends-incoming-user-accept" onClick={() => store.removeRequests(requests.id, store.user.id)}>Отменить заявку</button>
                                </div>
                                <div className="friends-incoming-user-online">
                                    {store.usersOnline.map(user => user === requests.idUserTo && <p key={user}><span className='online' />Online</p>)}
                                </div>
                            </div>
                            <div className="line"></div>
                        </div>
                    )
                }
            }
        }) 
    } else {
        return (
            <span>У вас нет исходящих заявок...</span>
        )
    }
};

export default observer(FriendsOutgoing);