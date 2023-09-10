import React, { useContext, useEffect } from 'react';
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import Header from '../Header';
import SideBar from '../SideBar';

const ProdileEdit = function () {
    const { store } = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
          store.checkAuth()
        }
    }, [store])

    return (
        <>
      <Header store={store} />
      <div id="page_layout">
        <SideBar store={store} />
        <div id="page_body">
            <div className='profile_header'>
                <div className='profile_edit'>
                    <div className='profile_edit_row'>
                        <label from="firstname-edit">Имя:</label>
                        <input type="text" id="firstname-edit" defaultValue={store.user.firstname}></input>
                    </div>
                    <div className='profile_edit_row'>
                        <label>Фамилия:</label>
                        <input type="text" id="lastname-edit" defaultValue={store.user.lastname}></input>
                    </div>
                    <div className='profile_edit_row'>
                        <label>День рождения:</label>
                        <input type="date" id="birtday-edit" defaultValue={store.user.birthday}></input>
                    </div>
                    <div className='profile_edit_row'>
                        <label>Телефон:</label>
                        <input type="number" id="phone-edit" defaultValue={store.user.phone}></input>
                    </div>
                    <div className='profile_edit_row'>
                        <label>Город:</label>
                        <input type="text" id="city-edit" defaultValue={store.user.city}></input>
                    </div>
                    <div className='profile_edit_row'>
                        <label>Образование:</label>
                        <input type="text" id="education-edit" defaultValue={store.user.education}></input>
                    </div>
                    <div className='profile_edit_row'>
                        <label>Обо мне:</label>
                        <input type="text" id="aboutMe-edit" defaultValue={store.user.aboutMe}></input>
                    </div>
                    <button>Сохранить</button>
                </div>
            </div>
        </div>
      </div>
    </>
    )
}

export default observer(ProdileEdit);