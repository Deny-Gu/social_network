import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { Navigate, useLocation } from 'react-router-dom';

function ProfileId () {
    const { store } = useContext(Context);
    const location = useLocation();

    if (store.location === '/') {
      return <Navigate to={`/id${store.user.id}`} state={{ from: location }} replace />
    }

    return <Navigate to={store.location} state={{ from: location }} replace />
};

export default observer(ProfileId)
