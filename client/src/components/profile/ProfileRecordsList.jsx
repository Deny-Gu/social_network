import { Link } from "react-router-dom";
import React from 'react';

function ProfileRecordsList({ store, users }) {

  return (
    <div className='profile_records_list'>
      {!(store.records.length === undefined) ? store.records.map(mes => {
        for (let i = 0; i < users.length; i++) {
          if (mes.idFrom === users[i].id) {
            return (
              <div className="redcord-wrapper" key={Math.random()}>
                <div className="record-head">
                  <h3><Link to={`/${users[i].email}`} >{users[i].firstname} {users[i].lastname}</Link></h3>
                  <p>{mes.date}</p>
                </div>
                <div className="record-message">
                  {mes.message}
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

export default ProfileRecordsList;