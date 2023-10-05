import React, { useContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import { AiOutlineClose } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';

function PhotoAlbums () {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const [viewModalAlbum, setViewModalAlbum] = useState(false);
    const [viewModalAddPhoto, setViewModalAddPhoto] = useState(false);
    const [album, setAlbum] = useState(null);
    const [albumId, setAlbumId] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [viewEditIcon, setViewEditIcon] = useState(null)
    const [viewEditIconText, setViewEditIconText] = useState(null)

    useEffect(() => {
        if (store.albums.length > 0) {
            setAlbum(store.albums[0].albumTitle);
            setAlbumId(store.albums[0].id);
        }
      }, [])

    function searchAlbumId (albumTitle) {
        setAlbum(albumTitle);
        store.albums.map(album => album.albumTitle === albumTitle ? setAlbumId(album.id) : null)
    }

    function ModalAddPhoto() {
        return (
          <div className="avatar-refresh-popup-wrapper">
            <div className="avatar-refresh-popup">
              <div className="refresh-header">
                <h3>Загрузка новой фотографии</h3>
                <div className="avatar-refresh-popup-close">
                  <AiOutlineClose style={{ color: "#6f7985", fontSize: "20px", cursor: "pointer" }} onClick={() => {setViewModalAddPhoto(false)}} />
                </div>
              </div>
              <div className="refresh-content">
                <p>Друзьям будет проще узнать вас, если вы загрузите свою настоящую фотографию.
                  Вы можете загрузить изображение в формате JPG, GIF или PNG.</p>
                <div className="refresh-content-upload">
                  {photo ? <img className="preview-avatar" src={URL.createObjectURL(photo)} alt="preview-avatar" /> : <></>}
                  <form onSubmit={(e) => {submitForm(e)}} method="POST" encType="multipart/form-data">
                    <label className="label-choice-albums" htmlFor="choice-albums">Выбрать альбом</label>
                    <select id="choice-albums" name="choice-albums" onChange={(e) => {searchAlbumId(e.target.value)}}>
                        {store.albums.map(album => <option key={album.id} value={album.albumTitle} >{album.albumTitle}</option>)}
                    </select>
                    {!photo ? <><label id="image-albums" htmlFor="image">Выбрать файл</label>
                    <input onChange={(e) => { setPhoto(e.target.files[0]) }} type="file" id="image" name="image" /></> :
                    <button id="image-albums-cancel" onClick={() => setPhoto(null)}>Отмена</button>}
                    {photo ? <button id="image-albums-submit" type="submit">Загрузить фотографию</button> : <></>}
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

    function ModalAddAlbum () {
        return (
            <div className="modal-add-album">
                <div className="modal-add-album-wrapper">
                    <div className="modal-add-album-wrapper-header">
                        <h3>Создать альбом</h3>
                        <div className="modal-add-album-wrapper-close">
                            <AiOutlineClose style={{ color: "#6f7985", fontSize: "20px", cursor: "pointer" }} onClick={() => {setViewModalAlbum(false)}} />
                        </div>
                    </div>
                    <div className="modal-add-album-wrapper-content">
                        <label name="name-album" htmlFor="name-album">Название</label>
                        <input type="text" id="name-album"></input>
                    </div>
                    <div className="modal-add-album-wrapper-footer">
                        <button className="add-album-cancel" onClick={() => {setViewModalAlbum(false)}}>Отмена</button>
                        <button className="add-album-succes" onClick={() => {onSubmit()}}>Создать альбом</button>
                    </div>
                </div>
            </div>
        )
    };

    function onSubmit () {
        const input = document.querySelector('#name-album');
        store.addAlbum(store.user.email, store.user.id, input.value); 
        setViewModalAlbum(false);
    }

    function submitForm(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", photo);
        formData.append("email", store.user.email);
        formData.append("idUser", store.user.id);
        formData.append("idAlbum", albumId);
        formData.append("albumTitle", album);
        fetch('http://localhost:5000/api/add-photo', {
          method: 'POST',
          body: formData,
        })
          .then((res) => res.json())
          .then((res) => store.getPhoto(store.user.id))
          .catch((err) => ("Error occured"));
        setPhoto(null)
        setViewModalAddPhoto(false)
        store.getPhoto(store.user.id)
        store.getAlbums(store.user.id)
      };

    return (
    <div className="photo-my_albums">
        <div className="photo-my_albums-header">
            <div className="photo-my_albums-header-title">
                <h3>Мои альбомы {store.albums.length}</h3>
            </div>
            <div className="photo-my_albums-header-nav">
                <button className="photo-create-album-btn" onClick={() => {setViewModalAlbum(true)}}>Создать альбом</button>
                <button className="photo-add-photo-btn" onClick={() => {setViewModalAddPhoto(true)}}>Добавить фотографии</button>
            </div>
        </div>
        <span className="line"></span>
        <div className="photo-my_albums-content">
          {store.albums ?
            <>
              {store.albums.length === 0 ? <div className="my_albums-no-item"><p>У вас нет альбомов</p></div> : 
              store.albums.map(album => { 
                return (<div className="my_albums-item" onClick={() => navigate(`/photo/album/${album.id}`)} onMouseOver={() => setViewEditIcon(album.id)} onMouseLeave={() => setViewEditIcon(null)} key={album.id}>
                        {album.cover !== undefined ? <img src={`${store.API_URL_UPLOADS + store.user.email.split('@')[0]}/albums/${album.albumTitle}/${album.cover}`} alt={album.albumTitle} /> : null}
                        <div className="my_albums-item-title">
                            <p style={{textAlign: "left"}}>{album.albumTitle}</p>
                            <p style={{textAlign: "right"}}>{album.photo.length}</p>
                        </div>
                        {viewEditIcon === album.id ? 
                            <div className="my_albums-item-edit" onClick={() => {store.setEditAlbum(album); navigate(`/photo/edit-album/${album.id}`)} }>
                              {viewEditIconText === album.id ? 
                                  <div className="my_albums-item-edit-icon">
                                    Редактирование альбома
                                  </div> :
                                  null}
                              <AiOutlineEdit onMouseOut={() => setViewEditIconText(album.id)} onMouseLeave={() => setViewEditIconText(null)}/>
                            </div> :
                            null}
                        </div>)
              })}
            </>
          : null}
        </div>
        {viewModalAlbum ? <ModalAddAlbum /> : <></>}
        {viewModalAddPhoto ? <ModalAddPhoto /> : <></>}
    </div>
    )
};

export default observer(PhotoAlbums);