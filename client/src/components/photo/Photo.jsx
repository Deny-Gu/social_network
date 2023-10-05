import { observer } from 'mobx-react-lite';
import PhotoAlbums from './PhotoAlbums';
import PhotoList from './PhotoList';

const Photo = function () {
    return (
        <div id="page_body">
            <PhotoAlbums />
            <PhotoList />
        </div>
    )

};

export default observer(Photo);