import React, { useContext, useEffect } from 'react';
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import ProfileHeader from './ProfileHeader';
import ProfileRecords from './ProfileRecords';
import { io } from 'socket.io-client'


const Profile = function () {
  const { store } = useContext(Context);

  const socket = io('http://localhost:5000', {
    query: {
      idUser: store.user.id
    }
  })

  useEffect(() => {
    socket.emit('user:add', store.user.id)

    socket.on('user_list:update', (users) => {
      store.setUsersOnline(users);
    })
  }, [])

  return (
    <>
      <ProfileHeader />
      <ProfileRecords />
    </>
  )
};

export default observer(Profile);
