import React, { useContext, useState, useRef } from 'react';
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import ProfileRecordsList from './ProfileRecordsList';
import { HiOutlineFaceSmile } from 'react-icons/hi2';
import EmojiPicker from 'emoji-picker-react';

function ProfileRecords({ users }) {
  const { store } = useContext(Context);
  const [viewSmiles, setViewSmiles] = useState(false);
  const [msg, setMsg] = useState('');
  const inputRef = useRef(null);
  const date = new Date();

  function onEmojiClick (emojiObject, event) {
    const { selectionStart, selectionEnd } = inputRef.current
    const newMsg = msg.slice(0, selectionStart) + emojiObject.emoji + msg.slice(selectionEnd)
    setMsg(newMsg)
    setViewSmiles(false)
  };

  function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
  };


  return (
      <div className='profile_records'>
        <div className='profile_records_add'>
        {store.user.avatar ? <img src={store.API_URL_UPLOADS + store.user.avatar} alt="profile-img" /> : <span className='profile_records-no-avatar'></span>}
          <textarea id='record-add-input' placeholder='Что у вас нового?' onInput={(e) => auto_grow(e.target)} ref={inputRef} value={msg} onChange={(e) => setMsg(e.target.value)}></textarea>
          <button className='record-add-btn' onClick={() => {store.addRecord(store.user.id, store.user.id, date, msg); setMsg('')}}>Опубликовать</button>
          <span className='record-smile'><HiOutlineFaceSmile onClick={() => setViewSmiles(!viewSmiles)} /></span>
          <div className='record-popup-smile'>{viewSmiles ? <EmojiPicker 
                                                              height={250} width={350}
                                                              categories={['suggested',
                                                                            'custom', 
                                                                            'smileys_people',
                                                                            'animals_nature',
                                                                            'food_drink',
                                                                            'travel_places',
                                                                            'activities',]}
                                                              previewConfig={
                                                                {showPreview: false} // defaults to: true
                                                              }
                                                              skinTonesDisabled={true} 
                                                              searchDisabled={true} 
                                                              emojiStyle="google" 
                                                              onEmojiClick={onEmojiClick} 
                                                            /> : <></>}</div>
        </div>
        <div className='profile_records_nav'>
          <button>Все записи</button>
          <button>Мои записи</button>
        </div>
        <ProfileRecordsList users={users} />
      </div>
  )

}

export default observer(ProfileRecords);