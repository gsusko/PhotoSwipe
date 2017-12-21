import { AsyncStorage } from 'react-native';
import {
  IG_LOGIN_SUCCESS,
  IG_LOGIN_FAIL
} from './types';

export const instagramLogin = (token, cb) => async dispatch => {
  await AsyncStorage.setItem('ig_token', token);
  dispatch({ type: IG_LOGIN_SUCCESS, payload: token });
};

export const checkForToken = () => async dispatch => {
  let token = await AsyncStorage.getItem('ig_token');
  if (token) {
    dispatch({ type: IG_LOGIN_SUCCESS, payload: token });
  }
};
