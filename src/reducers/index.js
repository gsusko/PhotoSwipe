import { combineReducers } from 'redux';

import auth from './authReducer';
import photos from './photoReducer';

export default combineReducers({
  auth,
  photos
});
