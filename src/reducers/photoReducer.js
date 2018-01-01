import {
  UPDATE_SEARCH_TERM
} from '../actions/types';

const INITIAL_STATE = {
  results: [],
  term: ''
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_SEARCH_TERM:
      return { ...state, term: action.payload }
    default:

  }
};
