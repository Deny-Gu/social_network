import React, { useContext, useEffect } from 'react';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import './css/index.css'
import { Navigate, Outlet } from 'react-router-dom';
import SideBar from './components/SideBar';

const App = (props) => {
  const { store } = useContext(Context)

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
    return (
      <Navigate to="/login" />
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
