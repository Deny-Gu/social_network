import { Link } from "react-router-dom";
import React, { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { HiOutlineFaceSmile } from 'react-icons/hi2';
import EmojiPicker from 'emoji-picker-react';

function ProfileRecordsList() {
  const { store } = useContext(Context);
  const [viewNavRecord, setViewNavRecord] = useState(null);
  const [editRecord, setEditRecord] = useState(null);
  const [select, setSelect] = useState(null);
  const [msg, setMsg] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    store.setRecords({})
    store.getRecords(store.userProfile.id)
  }, [store])

  function onEmojiClick (emojiObject, event) {
    const { selectionStart, selectionEnd } = inputRef.current
    const newSel = msg.slice(0, selectionStart) + emojiObject.emoji
    const newMsg = msg.slice(0, selectionStart) + emojiObject.emoji + msg.slice(selectionEnd)
    setMsg(newMsg)
    setSelect(newSel.length)
  };

  function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
  };

  function NavRecord ({index, idRecord, message}) {
    return (
      <>
        {viewNavRecord === index ? 
          <div className='nav-record-wrapper'>
            <button onClick={(e) => {setEditRecord(index); setMsg(message); setSelect(message.length)} }>Редактировать запись</button>
            <button onClick={() => {store.removeRecord(idRecord, store.user.id); setViewNavRecord(null)} }>Удалить запись</button>
          </div>
          :
          null}
      </>
    )
  };

  function getCoords(e, selector) {
    const block = document.querySelector(selector);

    if (e.target) {
      let box = e.target.getBoundingClientRect();
      block.style.top = box.bottom + window.scrollY - 400 + 'px';
    }
  }

  function showEmojiPicker (selector, classOn, classHidden) {
    const block = document.querySelector(selector);

    if (block) {
      block.classList.add(classOn);
      block.classList.remove(classHidden);
    }
  }

  function hiddenEmojiPicker (selector, classHidden, classOn) {
    const block = document.querySelector(selector);
    block.classList.add(classHidden);
    block.classList.remove(classOn);
  }

  if (store.loadingRecords) {
    return (
      <div className="loader"></div>
    )
  }

  return (
    <div className='profile_records_list'>
      {!(store.records.length === undefined) ? store.records.toReversed().map((record, index) => {
        for (let i = 0; i < store.users.length; i++) {
          if (record.idFrom === store.users[i].id) {
            return (
              <div className="record-wrapper" key={Math.random()}>
                <div className="record-head">
                  {store.users[i].avatar ? <img src={store.API_URL_UPLOADS + store.users[i].email.split('@')[0] + "/avatar/" + store.users[i].avatar} alt='profile_img'></img> : null}
                  <h3><Link to={`/id${store.users[i].id}`} onClick={() => {store.setUserProfile(store.users[i]); store.getRecords(store.users[i].id)}} >{store.users[i].firstname} {store.users[i].lastname}</Link></h3>
                  <p>{record.date}</p>
                </div>
                <div className="record-message">
                  {editRecord === index ? 
                    <>
                      <textarea id="record-edit-input" onFocus={(e) => e.target.selectionStart = select} onKeyDown={(e) => e.key === 'Enter' ? (store.editRecord(record.id, store.user.id, e.target.value), setEditRecord(null)) : null}  onInput={(e) => auto_grow(e.target)} ref={inputRef} value={msg} onClick={(e) => setSelect(e.target.selectionStart)} onChange={(e) => {setMsg(e.target.value); setSelect(e.target.selectionStart)}} autoFocus />
                      <span className='record-smile' onMouseEnter={(e) => {getCoords(e, `.profile_records_list .record-popup-smile-single`); showEmojiPicker(`.profile_records_list .record-popup-smile-single`, 'emoji-picker-on', 'emoji-picker-hidden')}}  onMouseLeave={() => hiddenEmojiPicker(`.profile_records_list .record-popup-smile-single`, 'emoji-picker-hidden', 'emoji-picker-on')}><HiOutlineFaceSmile /></span>
                      <button className="record-edit-save-btn" onClick={(e) => {store.editRecord(record.id, store.user.id, msg); setEditRecord(null)}}>Сохранить</button>
                    </>
                    : 
                    record.message
                  }
                </div>
                {(store.user.id === record.idUser || store.user.id === record.idFrom)? <div className="record-edit-btn" onMouseOver={(e) => {setViewNavRecord(index)}} onMouseLeave={() => setViewNavRecord(null)}>
                  <IoEllipsisHorizontalSharp style={{ color: "grey", fontSize: "24px", cursor: "pointer" }}/>
                  <NavRecord index={index} idRecord={record.id} message={record.message} />
                </div> : null}
              </div>
            )
          }
        }
      }) : <></>

      }
       <div className={`record-popup-smile-single record-style-smile emoji-picker-hidden`} onMouseEnter={() => {showEmojiPicker(`.profile_records_list .record-popup-smile-single`, 'emoji-picker-on', 'emoji-picker-hidden')}} onMouseLeave={() => hiddenEmojiPicker(`.profile_records_list .record-popup-smile-single`, 'emoji-picker-hidden', 'emoji-picker-on')}>
      <EmojiPicker height={300} width={300} categories={['suggested','smileys_people','animals_nature','food_drink','travel_places','activities',]}
          previewConfig={{showPreview: false}} skinTonesDisabled={true} searchDisabled={true} emojiStyle="google" onEmojiClick={onEmojiClick} />
      </div>
    </div>
  )

}

export default observer(ProfileRecordsList);