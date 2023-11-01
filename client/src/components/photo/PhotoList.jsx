import React, { useContext, useState, useEffect} from "react";
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import { AiOutlineClose } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

function PhotoList () {
    const { store } = useContext(Context);
    const [photo, setPhoto] = useState(false);
    const [viewPhoto, setViewPhoto] = useState(false);
    const [allPhoto, setAllPhoto] = useState([]);

    useEffect(() => {
        store.getPhoto(store.user.id)

        function allPhotoArr () {
            let arr = [];
            store.photo.map(photo => {
                return arr.push(`/${photo.albumTitle}/${photo.photo}`)
            })
            setAllPhoto(arr)
        }

        allPhotoArr()
      }, [store])


    function ModalViewPhoto () {
        document.body.style.overflow = 'hidden';

        function prevImage (img) {
            for (let i = 0; i < allPhoto.length; i++) {
                if (img === allPhoto[i]) {
                    if (i === 0) {
                        setPhoto(allPhoto[allPhoto.length - 1])
                    } else {
                        setPhoto(allPhoto[i-1])
                    }
                }
            }
        }
    
        function nextImage (img) {
            for (let i = 0; i < allPhoto.length; i++) {
                if (img === allPhoto[i]) {
                    if (i === allPhoto.length - 1) {
                        setPhoto(allPhoto[0])
                    } else {
                        setPhoto(allPhoto[i+1])
                    }
                }
            }
        }

        return (
            <div className="modal-view-photo-wrapper">
            <div className="modal-view-photo">
                <img src={`${store.API_URL_UPLOADS}/${store.user.email.split('@')[0]}/albums/${photo}`} alt={`${store.API_URL_UPLOADS}/${store.user.email.split('@')[0]}/albums/${photo}`}></img>
            </div>
            <div className="modal-view-photo-nav">
                <span className="prev-img" onClick={() => {prevImage(photo)}}><IoIosArrowBack /></span>
                <span className="next-img" onClick={() => {nextImage(photo)}}><IoIosArrowForward /></span>
            </div>
            <div className="modal-view-photo-close">
                <AiOutlineClose style={{ color: "white", fontSize: "30px", cursor: "pointer" }} onClick={() => { setViewPhoto(false); document.body.style.overflow = ''; }} />
            </div>
            </div>
        )
    }

    return (
        <div className="photo-my_albums">
            <div className="photo-my_albums-header">
                <div className="photo-my_albums-header-title">
                    <h3>Мои фотографии {store.photo.length}</h3>
                </div>
            </div>
            <span className="line"></span>
            <div className="photo-my_albums-content">
                {store.photo.map(photo => 
                        <div className="photo-item" key={photo.id}>
                            <img onClick={() => {setViewPhoto(true); setPhoto(`/${photo.albumTitle}/${photo.photo}`)}} src={`${store.API_URL_UPLOADS}/${store.user.email.split('@')[0]}/albums/${photo.albumTitle}/${photo.photo}`} alt={photo.photo}/>
                        </div>
                )}
            </div>
            {viewPhoto ? <ModalViewPhoto /> : null}
        </div>
    )
};

export default observer(PhotoList);