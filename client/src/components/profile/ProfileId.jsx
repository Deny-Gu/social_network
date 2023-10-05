import React, { useContext, useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { Navigate, useLocation } from 'react-router-dom';

function ProfileId () {
    const { store } = useContext(Context);
    const location = useLocation();

    useEffect(() => {
        if (store.user.id) {
          store.getRecords(store.user.id);
          store.getAlbums(store.user.id);
          store.getPhoto(store.user.id);
          store.getUsers();
        }
      }, [store])
    
    
    if (store.isLoadingRecords || store.isLoadingAlbums || store.isLoadingPhoto || store.isLoadingUsers) {
    return (
        <div className='loader'></div>
    )
    }

    return <Navigate to={`/id${store.user.id}`} state={{ from: location }} replace />
};

export default observer(ProfileId)
