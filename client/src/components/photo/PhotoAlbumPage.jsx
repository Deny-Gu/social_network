import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import { AiOutlineClose } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

function PhotoAlbumPage () {
    const { store } = useContext(Context);
    let location = useLocation();

    const [albumView, setAlbumView] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        if (store.albums.length !== undefined) {
            store.albums.map(album => {
                if (album.id === Number(location.pathname.match(/\d+/g))) {
                    return setAlbumView(album);
                }
                return null
            })
        }
    }, [store.albums, location.pathname])

    if (albumView === null) {
        return (
            <div className="loader"></div>
        )
    }

    function ModalViewPhoto () {
        document.body.style.overflow = 'hidden';

        function prevImage (img) {
            for (let i = 0; i < albumView.photo.length; i++) {
                if (img === albumView.photo[i].photo) {
                    if (i === 0) {
                        setPhoto(albumView.photo[albumView.photo.length - 1].photo)
                    } else {
                        setPhoto(albumView.photo[i-1].photo)
                    }
                }
            }
        }
    
        function nextImage (img) {
            for (let i = 0; i < albumView.photo.length; i++) {
                if (img === albumView.photo[i].photo) {
                    if (i === albumView.photo.length - 1) {
                        setPhoto(albumView.photo[0].photo)
                    } else {
                        setPhoto(albumView.photo[i+1].photo)
                    }
                }
            }
        }

        return (
            <div className="modal-view-photo-wrapper">
            <div className="modal-view-photo">
                <img src={`${store.API_URL_UPLOADS}/${store.user.email.split('@')[0]}/albums/${albumView.albumTitle}/${photo}`} alt={`${store.API_URL_UPLOADS}/${store.user.email.split('@')[0]}/albums/${photo}`}></img>
            </div>
            <div className="modal-view-photo-nav">
                <span className="prev-img" onClick={() => {prevImage(photo)}}><IoIosArrowBack /></span>
                <span className="next-img" onClick={() => {nextImage(photo)}}><IoIosArrowForward /></span>
            </div>
            <div className="modal-view-photo-close">
                <AiOutlineClose style={{ color: "white", fontSize: "30px", cursor: "pointer" }} onClick={() => { setShowModal(false); document.body.style.overflow = ''; }} />
            </div>
            </div>
        )
    }

    return (
        <div className="photo-my_albums">
            <div className="photo-my_albums-header">
                <div className="photo-my_albums-header-block">
                    <div className="photo-my_albums-header-block-pagination">
                        <Link to={`/photo/`}>Мои фотографии</Link>
                        <div className="crumb_sep"></div>
                        <span>{albumView.albumTitle}</span>
                    </div>
                </div>
            </div>
            <span className="line"></span>
            <div className="photo-my_albums-view-album-nav">
                <h3>{albumView.albumTitle}</h3>
                <div className="nav-view-album">
                    {albumView.photo.length !== undefined ? <span>{albumView.photo.length} фото</span> : null}
                    <Link to={`/photo/edit-album/${albumView.id}`} onClick={() => {store.setEditAlbum(albumView)}}>Редактировать альбом</Link>
                </div>
            </div>
            <div className="photo-my_albums-content-photo-all">
                {albumView.photo.map(photo => {
                    return (
                        <div className="content-photo-all-item" key={photo.id}>
                            {photo.photo ? <img src={`${store.API_URL_UPLOADS + store.user.email.split('@')[0]}/albums/${photo.albumTitle}/${photo.photo}`} onClick={() => {setShowModal(true); setPhoto(photo.photo)}} alt={photo.photo} /> : null}
                        </div>
                    )
                })}
            </div>
            {showModal && <ModalViewPhoto />}
        </div>
    )
};

export default observer(PhotoAlbumPage);