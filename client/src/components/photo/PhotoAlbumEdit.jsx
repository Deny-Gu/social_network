import React, { useContext, useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { AiOutlineClose } from 'react-icons/ai';

function PhotoAlbumEdit () {
    const { store } = useContext(Context);
    const [viewDeleteIcon, setViewDeleteIcon] = useState(null)
    const [viewDeleteIconText, setViewDeleteIconText] = useState(null)

    function viewEditCoverBtn (selector) {
        let block = document.querySelector(selector);
        block.style.display = 'block'
    }

    function hideEditCoverBtn (selector) {
        let block = document.querySelector(selector);
        block.style.display = 'none'
    }

    function deletePhoto (photo, i) {
        store.removePhoto(photo.id, store.user.email, photo.albumTitle, photo.photo, store.user.id);
        let newObj = {};
        Object.assign(newObj, store.editAlbum);
        newObj.photo.splice(i, 1);
        if (newObj.photo.length === 0) {
            newObj.cover = ''
        }
        store.setEditAlbum(newObj);
    };

    return (
        <div className="photo-my_albums">
            <div className="photo-my_albums-header">
                <div className="photo-my_albums-header-block">
                    <div className="photo-my_albums-header-block-pagination">
                        <Link to={`/photo/`}>Мои фотографии</Link>
                        <div className="crumb_sep"></div>
                        <Link to={`/photo/album/${store.editAlbum.id}`}>{store.editAlbum.albumTitle}</Link>
                        <div className="crumb_sep"></div>
                        <span>Редактирование альбома</span>
                    </div>
                    <div className="photo-my_albums-header-block-remove_album">
                        <button id="remove_album-btn" onClick={() => {}}>Удалить альбом</button>
                    </div>
                </div>
            </div>
            <span className="line"></span>
            <div className="photo-my_albums-content-edit">
                <div className="photo-my_albums-content-edit-cover">
                    <h4>Обложка альбома</h4>
                    <div className="photo-my_albums-content-edit-cover-img" onMouseOver={() => viewEditCoverBtn('.edit-cover-img-btn')} onMouseLeave={() => hideEditCoverBtn('.edit-cover-img-btn')}>
                        {store.editAlbum.cover ? <img  src={`${store.API_URL_UPLOADS + store.user.email.split('@')[0]}/albums/${store.editAlbum.albumTitle}/${store.editAlbum.cover}`} alt={store.editAlbum.cover} /> : null}
                        <div className="edit-cover-img-btn">
                            <span id="edit-cover"><HiOutlinePhoto />Изменить обложку</span>
                        </div>
                    </div>
                </div>
                <div className="photo-my_albums-content-edit-name">
                    <h4>Название альбома</h4>
                    <input type="text" value={store.editAlbum.albumTitle} readOnly/>
                    <button>Сохранить изменения</button>
                </div>
            </div>
            <span className="line"></span>
            <div className="photo-my_albums-content-photo">
                <div className="photo-my_albums-content-photo-header">
                    <span>{store.editAlbum.photo.length} фото</span>
                </div>
                <div className="photo-my_albums-content-photo-all">
                    {store.editAlbum.photo.map((photo, i) => {
                                return (
                                    <div className="content-photo-all-item" key={photo.id}  onMouseOver={() => setViewDeleteIcon(photo)} onMouseLeave={() => setViewDeleteIcon(null)}>
                                        <img src={`${store.API_URL_UPLOADS + store.user.email.split('@')[0]}/albums/${photo.albumTitle}/${photo.photo}`} alt={photo} />
                                        {viewDeleteIcon === photo ? <div className="content-photo-all-item-remove" onClick={() => deletePhoto(photo, i)}  onMouseOut={() => setViewDeleteIconText(photo)} onMouseLeave={() => setViewDeleteIconText(null)}>
                                                                        <AiOutlineClose />
                                                                        {viewDeleteIconText === photo ? <div className="my_albums-item-edit-icon">
                                                                            Удалить фотографию
                                                                        </div> : null}
                                                                    </div> : null}
                                    </div>
                                ) 
                            })
                        }
                </div>
            </div>
        </div>
    )
};

export default observer(PhotoAlbumEdit);