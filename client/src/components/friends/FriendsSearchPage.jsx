import { observer } from "mobx-react-lite";
import FriendsSearch from "./FriendsSearch";
import FriendsMenu from "./FriendsMenu";

function FriendsSearchPage () {
    return (
        <div className="friends-page">
            <FriendsSearch />
            <FriendsMenu />
        </div>
    )
};

export default observer(FriendsSearchPage);