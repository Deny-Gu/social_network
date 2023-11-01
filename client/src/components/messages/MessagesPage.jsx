import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import MessagesList from "./MessagesList";
import MessagesFriends from "./MessagesFriends";

function MessagesPage () {
    const { store } = useContext(Context);

    return (
        <div className="messages-page">
            <MessagesList />
            <MessagesFriends />
        </div>
    )
};

export default observer(MessagesPage);