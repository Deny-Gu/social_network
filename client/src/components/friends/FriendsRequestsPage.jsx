import { observer } from "mobx-react-lite";
import FriendsRequests from "./FriendsRequests";
import FriendsMenu from "./FriendsMenu";

function FriendsRequestsPage () {
    return (
        <div className="friends-page">
            <FriendsRequests />
            <FriendsMenu />
        </div>
    )
};

export default observer(FriendsRequestsPage);