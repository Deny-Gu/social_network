import { Link } from "react-router-dom";
import { FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineUsers } from 'react-icons/hi';
import { BiMessageDetail } from 'react-icons/bi';
import { HiOutlinePhoto } from 'react-icons/hi2';

function SideBar() {
    return (
        <div id="sidebar">
            <div className="sidebar-wrapper">
                <nav>
                    <ul>
                        <li>
                            <span className="sidebar_icon">
                                <FaRegUserCircle />
                            </span>
                            <Link to={`/`}>Моя страница</Link>
                        </li>
                        <li>
                            <span className="sidebar_icon">
                                <HiOutlineUsers />
                            </span>
                            <Link to="/">Друзья</Link>
                        </li>
                        <li>
                            <span className="sidebar_icon">
                                <BiMessageDetail />
                            </span>
                            <Link to="/">Сообщения</Link>
                        </li>
                        <li>
                            <span className="sidebar_icon">
                                <HiOutlinePhoto />
                            </span>
                            <Link to="/">Фотографии</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default SideBar;