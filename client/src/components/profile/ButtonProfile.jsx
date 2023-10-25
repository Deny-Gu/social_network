import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../..";
import { observer } from 'mobx-react-lite';

function ButtonProfile () {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const [button, setButton] = useState('');

    useEffect(() => {
        let promise = new Promise((res, rej) => {
            if (store.requestsOutgoing.length) {
                store.requestsOutgoing.map((req) => {
                  if (req.idUserTo === store.userProfile.id) {
                    res('requests')
                  }
                })
            }
            if (store.friends.length) {
                store.friends.map((friend) => {
                  if (friend.id === store.userProfile.id) {
                    res('friend')
                  }
                })
            }
            res('no-friend')
        })

        promise.then(res => setButton(res))
    }, [store.requestsOutgoing, store.friends, store.userProfile.id])

    if (store.userProfile.id === store.user.id) {
      return <button id='profile_edit_btn' onClick={() => { navigate(`/profile-edit`) }}>Редактировать профиль</button>
    }

    if (button === 'requests') {
      return <button id='profile_waiting-requests-friend_btn'>Запрос отправлен</button>
    } 
    
    if (button === 'friend') {
      return <button id='profile_message-friend_btn' onClick={() => { }}>Сообщение</button>
    } 
    
    if (button === 'no-friend') {
        return <button id='profile_add-friend_btn' onClick={() => store.addRequests(store.user.id, store.userProfile.id)}>Добавить в друзья</button>
    }

  };

  export default observer(ButtonProfile);