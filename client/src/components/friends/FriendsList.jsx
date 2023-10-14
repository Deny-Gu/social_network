import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

function FriendsList () {
    return (
        <div className="friends-page-list">
            <div className="friends-page-list-header">
                <Link id="friends-all-btn">Все друзья</Link>
                <Link  id="friends-online-btn">Друзья онлайн</Link>
                <Link to={'/friends-search'} id="friends-search-btn">Найти друзей</Link>
            </div>
            <div className="line"></div>
            <div className="friends-page-list-content">
                <span>У вас пока нет друзей...</span>
            </div>  
        </div>
    )
};

export default observer(FriendsList);