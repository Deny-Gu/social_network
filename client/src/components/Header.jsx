import React, { useContext } from 'react';
import { Context } from "..";
import { observer } from 'mobx-react-lite';
import logo from '../img/sk-logo.png';
import HeaderNavProfile from "./HeaderNavProfile";

function Header() {
    const { store } = useContext(Context);

    return (
        <header>
            <div className="header-wrapper">
                <div className="header-logo">
                    <img src={logo} alt="logo-sk" />
                    <h1>Sidekick</h1>
                </div>
                {!(store.isAuth) ? <></> : <HeaderNavProfile />}
            </div>
        </header>
    )
}

export default observer(Header)