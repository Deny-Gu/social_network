import React, { useState, useRef } from 'react';
import ProfileRecordsList from './ProfileRecordsList';
import { HiOutlineFaceSmile } from 'react-icons/hi2';
import EmojiPicker from 'emoji-picker-react';

function ProfileRecords({ store, users }) {
  const [viewSmiles, setViewSmiles] = useState(false);
  const [msg, setMsg] = useState('');
  const inputRef = useRef(null)

  const onEmojiClick = (emojiObject, event) => {
    const { selectionStart, selectionEnd } = inputRef.current
    const newMsg = msg.slice(0, selectionStart) + emojiObject.emoji + msg.slice(selectionEnd)
    setMsg(newMsg)
    setViewSmiles(false)
  };

  function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
  }

  return (
      <div className='profile_records'>
        <div className='profile_records_add'>
          <img src={store.API_URL_UPLOADS + store.user.avatar} alt='profile_records_img'></img>
          <textarea id='record-add-input' placeholder='Что у вас нового?' onInput={(e) => auto_grow(e.target)} ref={inputRef} value={msg} onChange={(e) => setMsg(e.target.value)}></textarea>
          <button className='record-add-btn'>Опубликовать</button>
          <span className='record-smile' onClick={() => setViewSmiles(!viewSmiles)}><HiOutlineFaceSmile /></span>
          <div className='record-popup-smile'>{viewSmiles ? <EmojiPicker 
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
                                                              emojiStyle="native" 
                                                              onEmojiClick={onEmojiClick} 
                                                            /> : <></>}</div>
        </div>
        <div className='profile_records_nav'>
          <button>Все записи</button>
          <button>Мои записи</button>
        </div>
        <ProfileRecordsList store={store} users={users} />
      </div>
  )

}

export default ProfileRecords;