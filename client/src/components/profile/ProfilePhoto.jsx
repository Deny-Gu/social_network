import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import { AiOutlineClose } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

function ProfilePhoto () {
    const { store } = useContext(Context);
    const [photoAll, setPhotoAll] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const promise = store.getPhoto(store.userProfile.id);
        promise.then(data => setPhotoAll(data))
    }, [store, store.userProfile])

    function ModalViewPhoto () {
        document.body.style.overflow = 'hidden';

        function prevImage (img) {
            for (let i = 0; i < photoAll.length; i++) {
                if (img === photoAll[i].photo) {
                    if (i === 0) {
                        setPhoto(photoAll[photoAll.length - 1])
                    } else {
                        setPhoto(photoAll[i-1])
                    }
                }
            }
        }
    
        function nextImage (img) {
            for (let i = 0; i < photoAll.length; i++) {
                if (img === photoAll[i].photo) {
                    if (i === photoAll.length - 1) {
                        setPhoto(photoAll[0])
                    } else {
                        setPhoto(photoAll[i+1])
                    }
                }
            }
        }

        return (
            <div className="modal-view-photo-wrapper">
            <div className="modal-view-photo">
                <img src={`${store.API_URL_UPLOADS}/${store.userProfile.email.split('@')[0]}/albums/${photo.albumTitle}/${photo.photo}`} alt={`${store.API_URL_UPLOADS}/${store.user.email.split('@')[0]}/albums/${photo.photo}`}></img>
            </div>
            <div className="modal-view-photo-nav">
                <span className="prev-img" onClick={() => {prevImage(photo.photo)}}><IoIosArrowBack /></span>
                <span className="next-img" onClick={() => {nextImage(photo.photo)}}><IoIosArrowForward /></span>
            </div>
            <div className="modal-view-photo-close">
                <AiOutlineClose style={{ color: "white", fontSize: "30px", cursor: "pointer" }} onClick={() => { setShowModal(false); document.body.style.overflow = ''; }} />
            </div>
            </div>
        )
    }

    if(photoAll)

    if (photoAll.length > 0) {
        return (
            <div className='profile-photo-wrapper'>
                <div className='profile-photo'>
                    <div className="profile-photo-content-photo-title">
                        <h4>Фотографии</h4>
                    </div>
                    <div className="profile-photo-content-photo-all">
                        {photoAll.map((photo, i) => {
                                    if (i < 4) {
                                        return (
                                            <div className="profile-photo-content-photo-all-item" key={photo.id}>
                                                <img src={`${store.API_URL_UPLOADS + store.userProfile.email.split('@')[0]}/albums/${photo.albumTitle}/${photo.photo}`} onClick={() => {setShowModal(true); setPhoto(photo)}} alt={photo.photo} />
                                            </div>
                                        ) 
                                    }
                                    return null
                                })
                            }
                    </div>
                </div>
                {showModal && <ModalViewPhoto />}
            </div>
        )
    }
};

export default observer(ProfilePhoto);