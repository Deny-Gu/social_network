import { observer } from 'mobx-react-lite';
import ProfileHeader from './ProfileHeader';
import ProfileRecords from './ProfileRecords';

const Profile = function () {
  return (
    <>
      <ProfileHeader />
      <ProfileRecords />
    </>
  )
};

export default observer(Profile);
