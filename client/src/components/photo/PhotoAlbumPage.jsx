import React, { useContext, useState, useEffect} from "react";
import { Context } from "../..";
import { observer } from 'mobx-react-lite';

function PhotoAlbumPage () {
    const { store } = useContext(Context);

    return (
        <div className="photo-my_albums-page">

        </div>
    )
};

export default observer(PhotoAlbumPage);