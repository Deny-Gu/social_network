import { useState } from "react";
import profileImg from '../img/profile.jpg'
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import { RxExit } from 'react-icons/rx';

const HeaderNavProfile = function ({ store }) {
    const [openPopup, setOpenPopup] = useState(false);

    function ProfilePopup() {
        return (
            <>
                <div className="header-profile" onClick={() => !openPopup ? setOpenPopup(true) : setOpenPopup(false)}>
                    <img src={profileImg} alt="profile-img" />
                    <span className="profile_icon">
                        <IoIosArrowDown />
                    </span>
                </div>
                {openPopup ? (
                    <div className="header-profile-popup">
                        <>
                            <div className="profile-popup-header">
                                <img src={profileImg} alt="profile-img" />
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
            <ProfilePopup />
        </div>
    )
};;

export default HeaderNavProfile;