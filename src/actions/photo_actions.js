import axios from 'axios';
import {
  UPDATE_SEARCH_TERM,
  FETCH_PHOTOS,
  LIKE_PHOTO,
  DELETE_ONE_PHOTO
} from './types';

import { FLICKR_KEY } from '../../config';

export const updateSearch = (value) => {
  return {
    type: UPDATE_SEARCH_TERM,
    payload: value
  };
};

export const fetchPhotos = (lat, long, term, cb) => async dispatch => {
  term = term || '';
  try {
    let photoData = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_KEY}&sort=interestingness-des&text=${term}&lat=${lat}&lon=${long}&per_page=20&extras=date_taken,description,url_l&format=json&nojsoncallback=1`);
    let photos = photoData.data.photos.photo;

    dispatch({
      type: FETCH_PHOTOS,
      payload: photos
    });

    cb();
  } catch(err) {
    console.error(err);
  }
};

export const likePhoto = photo => {
  return {
    type: LIKE_PHOTO,
    payload: photo
  }
};

export const deleteOneLikedPhoto = index => {
  return {
    type: DELETE_ONE_PHOTO,
    payload: index
  }
};
