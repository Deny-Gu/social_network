import { useNavigate } from 'react-router-dom';
import profileImg from '../../img/profile.jpg'
import { HiOutlineGift } from 'react-icons/hi2';
import { HiOutlineHome } from 'react-icons/hi2'
import { BsTelephone } from 'react-icons/bs'
import { PiStudent } from 'react-icons/pi'
import { BsLayoutTextSidebarReverse } from 'react-icons/bs'

function ProfileHeader ({store}) {
    const navigate = useNavigate();

    return (
        <div className='profile_header'>
            <div className='profile_avatar'>
              <img src={profileImg} alt='profile_img'></img>
            </div>
            <div className='profile_info'>
              <button id='profile_edit_btn' onClick={() => {navigate(`/${store.user.email.split('@')[0]}/profile-edit`)}}>Редактировать профиль</button>
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
        </div>
    )
}

export default ProfileHeader;