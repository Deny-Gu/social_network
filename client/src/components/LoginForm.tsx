import React, { FC, useState, useContext, useEffect } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import logo from '../img/sk-logo.png'

const LoginForm: FC = function () {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const { store } = useContext(Context)
    const navigate = useNavigate();
    const location = useLocation();

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

    if (store.isAuth) {
        return (
            <Navigate to="/" state={{ from: location }} replace />
        )
    }

    return (
        <>
            {/* <Header store={store} /> */}
            <main>
                <div className='login-wrapper'>
                    <img src={logo} alt="logo-sk" />
                    <form id='login-form'>
                        <h2>Вход Sidekick</h2>
                        <p className='error'>{store.error}</p>
                        <input type='text' id='login' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email'></input>
                        <input type='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Пароль'></input>
                        <input id='login-btn' type='button' onClick={() => { store.login(email, password); }} defaultValue='Войти'></input>
                    </form>
                    <div className='registration-wrapper'>
                        <p>У меня нет аккаунта</p>
                        <button className="registration-btn" onClick={() => { navigate("/registration"); store.setError('') }}>Зарегистрироваться</button>
                    </div>
                </div>
            </main>
        </>
    );
};

// <div>
//     <input
//         onChange={e => setEmail(e.target.value)}
//         value={email}
//         type="text"
//         placeholder='Email'
//     />
//     <input
//         onChange={e => setPassword(e.target.value)}
//         value={password}
//         type="password"
//         placeholder='Пароль'
//     />
//     <button onClick={() => store.login(email, password)}>Логин</button>
//     <button onClick={() => store.registration(email, password)}>Регистрация</button>
// </div>



export default observer(LoginForm);
