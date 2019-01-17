import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, REGISTER, REGISTER_SUCCESS, REGISTER_FAILED, REGISTER_CANCEL } from "./Auth-Actions";
import { common } from "../utils/common";

const initialState = {
  isAuthorized: !common.isEmptyString(localStorage.getItem('user')),
  username: localStorage.getItem('user'),
  step: 'login',
}


export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const username = 'jake';
      localStorage.setItem('user', username);
      return {
        ...state,
        isAuthorized: true,
        username: username,
        step: 'loggedIn'
      }

    case LOGIN:
    case LOGIN_FAILED:
    case LOGOUT:
      //TODO: remove this (reducer is pure function)
      localStorage.removeItem('user');
      return {
        ...state,
        isAuthorized: false,
        username: '',
        step: 'login'
      }

    case REGISTER:
    case REGISTER_FAILED:
      return { ...state, step: 'register' }

    case REGISTER_SUCCESS:
    case REGISTER_CANCEL:
      state.step = 'login'
      return { ...state, step: 'login' }

    default:
      return state
  }
}