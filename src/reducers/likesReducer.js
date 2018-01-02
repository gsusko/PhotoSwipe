import _ from 'lodash';
import {
  LIKE_PHOTO
} from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case LIKE_PHOTO:
      return _.uniqBy([action.payload, ...state], 'id');
    default:
      return state;
  }
};
