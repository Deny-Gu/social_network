import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import ProfileHeader from './ProfileHeader';
import ProfileRecords from './ProfileRecords';
import ProfilePhoto from './ProfilePhoto';
import ProfileEdit from './ProfileEdit';
import { io } from 'socket.io-client'

const Profile = function () {
  const { store } = useContext(Context);

  useEffect(() => {
    if (store.user.id) {
      store.getAlbums(store.user.id);
      store.getPhoto(store.user.id);
      store.getUsers();
      store.getFriends(store.user.id);
      store.getRequestsIncoming(store.user.id);
      store.getRequestsOutgoing(store.user.id);
      store.getChats(store.user.id)
    }

    const socket = io('http://localhost:5000', {
      query: {
        idUser: store.user.id,
      }
    })

    socket.emit('user:add', store.user.id)

    socket.on('user_list:update', (users) => {
      store.setUsersOnline(users);
    })

    socket.emit('user_room:add', store.user.id)

    socket.emit('message:get')

    socket.on('message_list:update', (msg) => {
      store.setChatsMessages({...store.chatsMessages, ...msg})
    })

  }, [store])

  if (!store.user.firstname || !store.user.firstname) {
    return (
      <div id="page_layout">
          <ProfileEdit />
      </div>

    )
  }
  
  return (
    <>
      <ProfileHeader />
      <ProfilePhoto />
      <ProfileRecords />
    </>
  )
};

export default observer(Profile);
