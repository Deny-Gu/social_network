import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../..";
import UserService from '../../services/UserService';
import { observer } from 'mobx-react-lite';
import Header from '../Header';
import SideBar from '../SideBar';
import { Navigate, useLocation } from 'react-router-dom';
import profileImg from '../../img/profile.jpg'
import ProfileRecordsList from './ProfileRecordsList';
import ProfileHeader from './ProfileHeader';

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
    <>
      <Header store={store} />
      <div id="page_layout">
        <SideBar store={store} />
        <div id="page_body">
          <ProfileHeader store={store} />
          <div className='profile_records'>
            <div className='profile_records_add'>
              <img src={profileImg} alt='profile_records_img'></img>
              <input id='record-add-input' placeholder='Что у вас нового?'></input>
            </div>
            <div className='profile_records_nav'>
              <button>Все записи</button>
              <button>Мои записи</button>
            </div>
            <ProfileRecordsList store={store} users={users} />
          </div>
        </div>
      </div>
    </>
  )
};

export default observer(Profile);
