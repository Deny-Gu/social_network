import React, {useState, useContext, useEffect}  from 'react'
import { Context } from '..';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import logo from '../img/sk-logo.png'
import { Navigate, useLocation } from 'react-router-dom';
import Header from './Header';


function Registration () {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)
    const navigate = useNavigate();
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

    if (store.isAuth) {
        return (
            <Navigate to="/" state={{ from: location }} replace />
        )
    }

    return (
      <>
        <Header store={store} />
        <main>
          <div className='registration-wrapper'>
            <img src={logo} alt="logo-sk"/>
            <form id='registration-form'>
              <h2>Регистрация</h2>
              <p className='error'>{store.error}</p>
              <input type='text' id='login' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email'></input>
              <input type='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Пароль'></input>
              <input className="registration-btn" type='button' onClick={() => store.registration(email, password)} defaultValue='Зарегистрироваться'></input>
            </form>
            <div className='login-wrapper'>
                <p>У меня уже есть аккаунта</p>
                <button className="login-btn" onClick={() => {navigate("/"); store.setError('')}}>Войти на сайт</button>
          </div>
          </div>
        </main>
      </>
    )
}

export default observer(Registration)