import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import MessagesFriends from "./MessagesFriends";
import MessagesRoom from "./MessagesRoom";

function MessagesRoomPage () {
    return (
        <div className="messages-page">
            <MessagesRoom />
            <MessagesFriends />
        </div>
    )
};

export default observer(MessagesRoomPage);