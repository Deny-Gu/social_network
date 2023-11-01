import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { useState } from "react";
import FriendsOutgoing from './FriendsOutgoing';
import FriendsIncoming from './FriendsIncoming';


function FriendsRequests () {
    const [requests, setRequests] = useState('incoming');

    return (
        <div className="friends-page-list">
            <div className="friends-page-list-header">
                <Link id="friends-all-btn" className={requests === 'incoming' ? 'friends-all-btn-active' : ''} onClick={() => setRequests('incoming')}>Входящие</Link>
                <Link  id="friends-online-btn" className={requests === 'outgoing' ? 'friends-all-btn-active' : ''} onClick={() => setRequests('outgoing')}>Исходящие</Link>
            </div>
            <div className="line"></div>
            <div className="friends-page-list-content">
                {requests === 'incoming' ? <FriendsIncoming /> : <FriendsOutgoing />}
            </div>
        </div>
    )
};

export default observer(FriendsRequests);