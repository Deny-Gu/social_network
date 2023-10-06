import React, { useContext} from "react";
import { observer } from 'mobx-react-lite';
import { Context } from "../..";
import PhotoAlbums from './PhotoAlbums';
import PhotoList from './PhotoList';

const Photo = function () {
    const { store } = useContext(Context);
    
    if (Object.keys(store.albums).length === 0 && Object.keys(store.photo).length === 0) {
        return (
          <div className='loader'></div>
        )
    }

    return (
        <div id="page_body">
            <PhotoAlbums />
            <PhotoList />
        </div>
    )

};

export default observer(Photo);