import {
  IG_LOGIN_SUCCESS
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case IG_LOGIN_SUCCESS:
      return { token: action.payload };
    default:
      return state;
  }
}
