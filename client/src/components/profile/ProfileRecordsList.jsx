import { Link } from "react-router-dom";
import { useContext, useState, useRef } from "react";
import { Context } from "../..";
import { observer } from 'mobx-react-lite';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { HiOutlineFaceSmile } from 'react-icons/hi2';
import EmojiPicker from 'emoji-picker-react';

function ProfileRecordsList({ users }) {
  const { store } = useContext(Context);
  const [viewNavRecord, setViewNavRecord] = useState(null);
  const [editRecord, setEditRecord] = useState(null);

  const [viewSmiles, setViewSmiles] = useState(false);
  const [msg, setMsg] = useState('');
  const inputRef = useRef(null);

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

  function NavRecord ({index, idRecord, message}) {
    return (
      <>
        {viewNavRecord === index ? 
          <div className='nav-record-wrapper'>
            <button onClick={() => {setEditRecord(index); setMsg(message)} }>Редактировать запись</button>
            <button onClick={() => {store.removeRecord(idRecord, store.user.id); setViewNavRecord(null)} }>Удалить запись</button>
          </div>
          :
          null}
      </>
    )
  };

  return (
    <div className='profile_records_list'>
      {!(store.records.length === undefined) ? store.records.toReversed().map((record, index) => {
        for (let i = 0; i < users.length; i++) {
          if (record.idFrom === users[i].id) {
            return (
              <div className="redcord-wrapper" key={Math.random()}>
                <div className="record-head">
                  {users[i].avatar ? <img src={store.API_URL_UPLOADS + users[i].avatar} alt='profile_img'></img> : null}
                  <h3><Link to={`/${users[i].email}`} >{users[i].firstname} {users[i].lastname}</Link></h3>
                  <p>{record.date}</p>
                </div>
                <div className="record-message">
                  {editRecord === index ? 
                    <>
                      <textarea id="record-edit-input" onFocus={(e) => {e.target.setSelectionRange(-1, -1);}} onKeyDown={(e) => e.key === 'Enter' ? (store.editRecord(record.id, store.user.id, e.target.value), setEditRecord(null)) : null}  onInput={(e) => auto_grow(e.target)} ref={inputRef} value={msg} onChange={(e) => setMsg(e.target.value)} defaultValue={record.message} autoFocus />
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
                                                            /> : <></>}
                      </div>
                      <button className="record-edit-save-btn" onClick={(e) => {store.editRecord(record.id, store.user.id, msg); setEditRecord(null)}}>Сохранить</button>
                    </>
                    : 
                    record.message
                  }
                </div>
                <div className="record-edit-btn"  onMouseOver={() => {setViewNavRecord(index)}} onMouseLeave={() => setViewNavRecord(null)}>
                  <IoEllipsisHorizontalSharp style={{ color: "grey", fontSize: "24px", cursor: "pointer" }}/>
                  <NavRecord index={index} idRecord={record.id} message={record.message} />
                </div>
              </div>
            )
          }
        }
        return true;
      }) : <></>

      }
    </div>
  )

}

export default observer(ProfileRecordsList);