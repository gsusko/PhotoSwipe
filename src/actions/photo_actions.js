import axios from 'axios';
import {
  UPDATE_SEARCH_TERM
} from './types';

export const updateSearch = (value) => {
  return {
    type: UPDATE_SEARCH_TERM,
    payload: value
  };
};
