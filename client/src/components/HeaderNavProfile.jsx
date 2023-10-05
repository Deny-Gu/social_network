import React, { useContext } from 'react';
import { Context } from "..";
import { observer } from 'mobx-react-lite';
import { useState } from "react";
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import { RxExit } from 'react-icons/rx';

const HeaderNavProfile = function () {
    const { store } = useContext(Context);
    const [openPopup, setOpenPopup] = useState(false);

    function ProfilePopup() {
        return (
            <>
                {openPopup ? (
                    <div className="header-profile-popup" onMouseLeave={() => setOpenPopup(false)}>
                        <>
                            <div className="profile-popup-header">
                            {store.user.avatar ? <img src={store.API_URL_UPLOADS + store.user.email.split('@')[0] + "/avatar/" + store.user.avatar} alt="profile-img" /> : <span className='header-profile-no-avatar'></span>}
                                <div>
                                    <p>{store.user.firstname} {store.user.lastname}</p>
                                    <p>{store.user.email}</p>
                                </div>
                            </div>
                            <div className="profile-popup-footer" onClick={() => { store.logout() }}>
                                <span className="exit_icon">
                                    <RxExit />
                                </span>
                                <button id="profile-btn-exit">Выйти</button>
                            </div>
                        </>

                    </div>
                ) : <></>
                }
            </>
        )
    }

    return (
        <div className="header-wrapper-nav">
            <div className="header-search">
                <span className="search_icon">
                    <AiOutlineSearch />
                </span>
                <input type="text" id="search" name="search" placeholder="Поиск"></input>
            </div>
            {store.isAuth ? 
                <>
                <div className="header-profile" onClick={() => !openPopup ? setOpenPopup(true) : setOpenPopup(false)}>
                    {store.user.avatar ? <div background-image={'../img/profile.jpg'}><img src={store.API_URL_UPLOADS + store.user.email.split('@')[0] + "/avatar/" + store.user.avatar} alt="profile-img" /></div> : <span className='header-profile-no-avatar'></span>}
                    <span className="profile_icon">
                        <IoIosArrowDown />
                    </span>
                </div> 
                <ProfilePopup />
                </>
            : <></>}
        </div>
    )
};;

export default observer(HeaderNavProfile);