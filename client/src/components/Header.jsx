
import logo from '../img/sk-logo.png';
import HeaderNavProfile from "./HeaderNavProfile";

function Header({ store }) {

    return (
        <header>
            <div className="header-wrapper">
                <div className="header-logo">
                    <img src={logo} alt="logo-sk" />
                    <h1>Sidekick</h1>
                </div>
                {!(store.isAuth) ? <></> : <HeaderNavProfile store={store} />}
            </div>
        </header>
    )
}

export default Header