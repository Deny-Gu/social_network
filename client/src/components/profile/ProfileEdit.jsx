import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import { BsCheckLg } from 'react-icons/bs'

const ProdileEdit = function () {
    const { store } = useContext(Context);
    const [firstname, setFirstname] = useState(store.user.firstname)
    const [lastname, setLastname] = useState(store.user.lastname)
    const [birthday, setBirthday] = useState(store.user.birthday)
    const [city, setCity] = useState(store.user.city)
    const [education, setEducation] = useState(store.user.education)
    const [phone, setPhone] = useState(store.user.phone)
    const [aboutMe, setAboutMe] = useState(store.user.aboutMe)
    const [editSucces, setEditSucces] = useState(false)

    return (
        <div id="page_body">
            <div className='profile_edit_wrapper'>
                <div className='profile_edit'>
                    <div className='profile_edit_row'>
                        <label from="firstname-edit">Имя:</label>
                        <input type="text" id="firstname-edit" onChange={(e) => { setFirstname(e.target.value) }} defaultValue={store.user.firstname}></input>
                    </div>
                    <div className='profile_edit_row'>
                        <label>Фамилия:</label>
                        <input type="text" id="lastname-edit" onChange={(e) => { setLastname(e.target.value) }} defaultValue={store.user.lastname}></input>
                    </div>
                    <div className='profile_edit_row'>
                        <label>День рождения:</label>
                        <input type="date" id="birtday-edit" onChange={(e) => { setBirthday(e.target.value) }} defaultValue={store.user.birthday}></input>
                    </div>
                    <div className='profile_edit_row'>
                        <label>Телефон:</label>
                        <input type="number" id="phone-edit" onChange={(e) => { setPhone(e.target.value) }} defaultValue={store.user.phone}></input>
                    </div>
                    <div className='profile_edit_row'>
                        <label>Город:</label>
                        <input type="text" id="city-edit" onChange={(e) => { setCity(e.target.value) }} defaultValue={store.user.city}></input>
                    </div>
                    <div className='profile_edit_row'>
                        <label>Образование:</label>
                        <input type="text" id="education-edit" onChange={(e) => { setEducation(e.target.value) }} defaultValue={store.user.education}></input>
                    </div>
                    <div className='profile_edit_row'>
                        <label>Обо мне:</label>
                        <input type="text" id="aboutMe-edit" onChange={(e) => { setAboutMe(e.target.value) }} defaultValue={store.user.aboutMe}></input>
                    </div>
                </div>
                <div className='profile-edit-footer'>
                    <button onClick={() => { store.editUser(store.user.email, firstname, lastname, birthday, city, education, phone, aboutMe); setEditSucces(true) }}>Сохранить</button>
                    {editSucces ? <p className='edit-succes'><BsCheckLg style={{verticalAlign: 'bottom', fontSize: '20px'}}/> Данные сохранены!</p> : <></>}
                </div>
            </div>
        </div>

    )
}

export default observer(ProdileEdit);