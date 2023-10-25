import React, { useContext, useEffect } from 'react';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import './css/index.css'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import SideBar from './components/SideBar';
import ProfileEdit from './components/profile/ProfileEdit';

const App = () => {
  const { store } = useContext(Context);
  let location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [store])

  if (store.isLoading) {
    return (
      <div className='loader'></div>
    )
  }

  if (!store.isAuth) {
    store.setLocation(location.pathname);
    return (
      <Navigate to="/login" />
    )
  }

  if (store.user.id) {
    store.getAlbums(store.user.id);
    store.getPhoto(store.user.id);
    store.getUsers();
    store.getFriends(store.user.id);
    store.getRequestsIncoming(store.user.id);
    store.getRequestsOutgoing(store.user.id);
  }

  if (!store.user.firstname || !store.user.firstname) {
    return (
      <div id="page_layout">
          <ProfileEdit />
      </div>

    )
  }

  return (
          <div id="page_layout">
            <SideBar />
            <div id="page_body">
             <Outlet />
            </div>
          </div>
          )

};;

export default observer(App);
