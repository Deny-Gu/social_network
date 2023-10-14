import { observer } from "mobx-react-lite";
import FriendsList from "./FriendsList";
import FriendsMenu from "./FriendsMenu";

function FriendsPage () {
    return (
        <div className="friends-page">
            <FriendsList />
            <FriendsMenu />
        </div>
    )
};

export default observer(FriendsPage);