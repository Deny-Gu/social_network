import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import { HiOutlineGift } from 'react-icons/hi2';
import { HiOutlineHome } from 'react-icons/hi2'
import { BsTelephone } from 'react-icons/bs'
import { PiStudent } from 'react-icons/pi'
import { BsLayoutTextSidebarReverse } from 'react-icons/bs'
import { HiOutlinePhoto } from 'react-icons/hi2';
import { VscEdit } from 'react-icons/vsc';
import { AiOutlineClose } from 'react-icons/ai';
import { GoTrash } from 'react-icons/go';

function ProfileHeader() {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [isNavAvatar, setIsNavAvatar] = useState(false);
  const [viewAvatar, setViewAvatar] = useState(false);
  const [refreshAvatar, setRefreshAvatar] = useState(false);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const [avatar, setAvatar] = useState(null);

  function NavAvatar() {
    return (
      <div className="nav-avatar-wrapper">
        <button onClick={() => { setViewAvatar(true); setIsNavAvatar(false) }}><HiOutlinePhoto style={{ fontSize: '21px', color: '#5181b8', paddingBottom: '3px', paddingRight: '7px', verticalAlign: "middle" }} /> Открыть фотографию</button>
        <button onClick={() => { setRefreshAvatar(true); setIsNavAvatar(false) }}><VscEdit style={{ fontSize: '21px', color: '#5181b8', paddingBottom: '3px', paddingRight: '7px', verticalAlign: "middle" }} /> Обновить фотографию</button>
        <button onClick={() => { setRemoveAvatar(true); setIsNavAvatar(false) }}><GoTrash style={{ fontSize: '20px', color: '#e90000', paddingBottom: '3px', paddingRight: '7px', verticalAlign: "middle" }} /> Удалить фотграфию</button>
      </div>
    )
  }

  function ViewAvatarPopup() {
    return (
      <div className="avatar-popup-wrapper">
        <div className="avatar-popup">
          <img src={store.API_URL_UPLOADS + store.user.avatar} alt='profile_avatar'></img>
        </div>
        <div className="avatar-popup-close">
          <AiOutlineClose style={{ color: "white", fontSize: "30px", cursor: "pointer" }} onClick={() => { setViewAvatar(false); setIsNavAvatar(false) }} />
        </div>
      </div>
    )
  }

  function submitForm(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", avatar);
    formData.append("email", store.user.email);

    fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(data => store.setAvatarUrl(data))
      .catch((err) => ("Error occured"));

    setAvatar(null)
    setRefreshAvatar(false);
    setIsNavAvatar(false);
  };

  function RefreshAvatarPopup() {
    return (
      <div className="avatar-refresh-popup-wrapper">
        <div className="avatar-refresh-popup">
          <div className="refresh-header">
            <h3>Загрузка новой фотографии</h3>
            <div className="avatar-refresh-popup-close">
              <AiOutlineClose style={{ color: "#6f7985", fontSize: "20px", cursor: "pointer" }} onClick={() => {setRefreshAvatar(false)}} />
            </div>
          </div>
          <div className="refresh-content">
            <p>Друзьям будет проще узнать вас, если вы загрузите свою настоящую фотографию.
              Вы можете загрузить изображение в формате JPG, GIF или PNG.</p>
            <div className="refresh-content-upload">
              {avatar ? <img className="preview-avatar" src={URL.createObjectURL(avatar)} alt="preview-avatar" /> : <></>}
              <form onSubmit={(e) => submitForm(e)} method="POST" encType="multipart/form-data">
                <label htmlFor="image">Выбрать файл</label>
                <input onChange={(e) => { setAvatar(e.target.files[0]) }} type="file" id="image" name="image" />
                {avatar ? <button type="submit">Сохранить</button> : <></>}
              </form>
            </div>
          </div>
          <div className="refresh-footer">
            <p>Если у вас возникают проблемы с загрузкой, попробуйте выбрать фотографию меньшего размера</p>
          </div>
        </div>
      </div>
    )
  }

  function RemoveAvatarPopup() {
    return (
      <div className="avatar-refresh-popup-wrapper">
        <div className="avatar-refresh-popup">
          <div className="refresh-header">
            <h3>Предупреждение</h3>
            <div className="avatar-refresh-popup-close">
              <AiOutlineClose style={{ color: "#6f7985", fontSize: "20px", cursor: "pointer" }} onClick={() => {setRemoveAvatar(false)}} />
            </div>
          </div>
          <div className="refresh-content">
            <p>Вы уверены, что хотите удалить фотографию?</p>
          </div>
          <div className="refresh-footer">
            <button className="remove-avatar-btn-cancel" onClick={() => {setRemoveAvatar(false)}}>Отмена</button>
            <button className="remove-avatar-btn-ok" onClick={() => {store.removeAvatar(store.user.email); setRemoveAvatar(false)}}>Удалить</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='profile_header'>
      <div className='profile_avatar' onMouseOver={() => { setIsNavAvatar(true) }} onMouseOut={() => { setIsNavAvatar(false) }}>
        {store.user.avatar ? <img src={store.API_URL_UPLOADS + store.user.avatar} alt='profile_img'></img> : null}
        {isNavAvatar ? <NavAvatar /> : <></>}
      </div>
      <div className='profile_info'>
        <button id='profile_edit_btn' onClick={() => { navigate(`/profile-edit`) }}>Редактировать профиль</button>
        <h1>{store.user.firstname} {store.user.lastname}</h1>
        <p>
          <span className="sidebar_icon">
            <HiOutlineGift />
          </span>
          День рождения: {store.user.birthday}
        </p>
        <p>
          <span className="sidebar_icon">
            <BsTelephone />
          </span>
          Телефон: {store.user.phone}
        </p>
        <p>
          <span className="sidebar_icon">
            <HiOutlineHome />
          </span>
          Город: {store.user.city}
        </p>
        <p>
          <span className="sidebar_icon">
            <PiStudent />
          </span>
          Образование: {store.user.education}
        </p>
        <p>
          <span className="sidebar_icon">
            <BsLayoutTextSidebarReverse />
          </span>
          Обо мне: {store.user.aboutMe}
        </p>
      </div>
      {viewAvatar ? <ViewAvatarPopup /> : <></>}
      {refreshAvatar ? <RefreshAvatarPopup /> : <></>}
      {removeAvatar ? <RemoveAvatarPopup /> : <></>}
    </div>
  )
}

export default observer(ProfileHeader);