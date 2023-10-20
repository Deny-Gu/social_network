import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../..";

function FriendsOnline () {
    const { store } = useContext(Context);

};

export default observer(FriendsOnline);