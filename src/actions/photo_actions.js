import axios from 'axios';
import {
  UPDATE_SEARCH_TERM,
  FETCH_PHOTOS
} from './types';

export const updateSearch = (value) => {
  return {
    type: UPDATE_SEARCH_TERM,
    payload: value
  };
};

export const fetchPhotos = (lat, long, term) => async dispatch => {
  let photoData = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=10d2e028263aa227379f2f809254cc79&text=dog&lat=${lat}&lon=${long}&per_page=20&format=json&nojsoncallback=1`);
  let photos = photoData.data.photos.photo;
  dispatch({
    type: FETCH_PHOTOS,
    payload: photos
  });
}
