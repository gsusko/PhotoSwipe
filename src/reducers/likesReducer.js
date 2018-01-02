import _ from 'lodash';
import {
  LIKE_PHOTO,
  DELETE_ONE_PHOTO
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case LIKE_PHOTO:
      return _.uniqBy([action.payload, ...state], 'id');
    case DELETE_ONE_PHOTO:
      return state.slice(0, action.payload).concat(state.slice(action.payload + 1));
    default:
      return state;
  }
};
