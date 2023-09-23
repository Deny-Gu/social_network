import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../..";
import UserService from '../../services/UserService';
import { observer } from 'mobx-react-lite';
import { Navigate, useLocation } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileRecords from './ProfileRecords';

const Profile = function () {
  const { store } = useContext(Context);
  const [users, setUsers] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
      store.getRecords('71')
      getUsers()
    }
  }, [store])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  if (!store.isAuth) {
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  }

  return (
    <div id="page_body">
      <ProfileHeader />
      <ProfileRecords users={users} />
    </div>
  )
};

export default observer(Profile);
