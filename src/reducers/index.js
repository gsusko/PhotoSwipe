import { combineReducers } from 'redux';

import auth from './authReducer';
import photos from './photoReducer';
import likedPhotos from './likesReducer';

export default combineReducers({
  auth,
  photos,
  likedPhotos
});
