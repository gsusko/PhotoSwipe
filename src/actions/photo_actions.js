import axios from 'axios';
import {
  UPDATE_SEARCH_TERM,
  FETCH_PHOTOS
} from './types';

import { FLICKR_KEY } from '../../config';

export const updateSearch = (value) => {
  return {
    type: UPDATE_SEARCH_TERM,
    payload: value
  };
};

export const fetchPhotos = (lat, long, term, cb) => async dispatch => {
  try {
    let photoData = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_KEY}&text=dog&lat=${lat}&lon=${long}&per_page=20&format=json&nojsoncallback=1`);
    let photos = photoData.data.photos.photo;
    dispatch({
      type: FETCH_PHOTOS,
      payload: photos
    });
    cb();
  } catch(err) {
    console.error(err);
  }
}
