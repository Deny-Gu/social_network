import React, { useContext, useState, useRef } from 'react';
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import ProfileRecordsList from './ProfileRecordsList';
import { HiOutlineFaceSmile } from 'react-icons/hi2';
import EmojiPicker from 'emoji-picker-react';

function ProfileRecords() {
  const { store } = useContext(Context);
  const [msg, setMsg] = useState('');
  const [selectStart, setSelectStart] = useState(null);
  const [selectEnd, setSelectEnd] = useState(null);
  const inputRef = useRef(null);
  const date = new Date();

  function onEmojiClick (emojiObject, event) {
    let newStart = msg.slice(0, selectStart) + emojiObject.emoji
    let newMsg = msg.slice(0, selectStart) + emojiObject.emoji + msg.slice(selectEnd)
    setSelectStart(newStart.length)
    setSelectEnd(newStart.length)
    setMsg(newMsg)
  };

  function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
  };

  function showEmojiPicker (selector, classOn, classHidden) {
    const block = document.querySelector(selector);
    block.classList.add(classOn);
    block.classList.remove(classHidden);
  }

  function hiddenEmojiPicker (selector, classHidden, classOn) {
    const block = document.querySelector(selector);
    block.classList.add(classHidden);
    block.classList.remove(classOn);
  }

  return (
      <div className='profile_records'>
        <div className='profile_records_add'>
        {store.user.avatar ? <img src={store.API_URL_UPLOADS + store.user.email.split('@')[0] + "/avatar/" + store.user.avatar} alt="profile-img" /> : <span className='profile_records-no-avatar'></span>}
          <textarea id='record-add-input' placeholder='Что у вас нового?' ref={inputRef} value={msg} onInput={(e) => {auto_grow(e.target); }} onClick={(e) => {setSelectStart(e.target.selectionStart); setSelectEnd(e.target.selectionEnd)}} onChange={(e) => { setMsg(e.target.value); setSelectStart(e.target.selectionStart); setSelectEnd(e.target.selectionEnd)}}></textarea>
          <button className='record-add-btn' onClick={() => {store.addRecord(store.user.id, store.user.id, date, msg); setMsg('')}}>Опубликовать</button>
          <span className='record-smile' onMouseEnter={() => showEmojiPicker('.profile_records_add .record-popup-smile', 'emoji-picker-on', 'emoji-picker-hidden')} onMouseLeave={() => hiddenEmojiPicker('.profile_records_add .record-popup-smile', 'emoji-picker-hidden', 'emoji-picker-on')}><HiOutlineFaceSmile /></span>
          <div className='record-popup-smile emoji-picker-hidden' onMouseOver={() => showEmojiPicker('.profile_records_add .record-popup-smile', 'emoji-picker-on', 'emoji-picker-hidden')} onMouseLeave={() => hiddenEmojiPicker('.profile_records_add .record-popup-smile', 'emoji-picker-hidden', 'emoji-picker-on')}>
            <EmojiPicker height={300} width={300} categories={['suggested','smileys_people','animals_nature','food_drink','travel_places','activities',]}
            previewConfig={{showPreview: false}} skinTonesDisabled={true} searchDisabled={true} emojiStyle="google" onEmojiClick={onEmojiClick} />
          </div>
        </div>
        <div className='profile_records_nav'>
          <button>Все записи</button>
          <button>Мои записи</button>
        </div>
        <ProfileRecordsList />
      </div>
  )

}

export default observer(ProfileRecords);