import {
  UPDATE_SEARCH_TERM,
  FETCH_PHOTOS
} from '../actions/types';

const INITIAL_STATE = {
  photos: [],
  term: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_SEARCH_TERM:
      return { ...state, term: action.payload }
    case FETCH_PHOTOS:
      return { ...state, photos: action.payload }
    default:
      return state;
  }
};
