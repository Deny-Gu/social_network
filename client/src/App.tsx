import React, { useContext, useEffect } from 'react';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import './css/index.css'
import { Navigate, useLocation } from 'react-router-dom';

const App = function () {
  const { store } = useContext(Context)
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [store])

  if (store.isLoading) {
    return (
      <div>Загрузка...</div>
    )
  }

  if (!store.isAuth) {
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  }

  return (
    <Navigate to={`/${store.user.email.split('@')[0]}`} state={{ from: location }} replace />
  );
};;

export default observer(App);
