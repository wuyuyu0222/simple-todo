import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, REGISTER, REGISTER_SUCCESS, REGISTER_FAILED, REGISTER_CANCEL } from "./actions";
import { Common } from "../../utils/common";

const initialState = {
  isAuthorized: !Common.isEmptyString(localStorage.getItem('user')),
  userName: localStorage.getItem('user'),
  step: 'login'
}


export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const userName = 'jake';
      localStorage.setItem('user', userName);
      state = {
        isAuthorized: true,
        userName: userName,
        step: 'loggedIn'
      };
      return state

    case LOGIN:
    case LOGIN_FAILED:
    case LOGOUT:
      localStorage.removeItem('user');
      state = {
        isAuthorized: false,
        userName: '',
        step: 'login'
      };
      return state;

    case REGISTER:
    case REGISTER_FAILED:
      state.step = 'register'
      return state;

    case REGISTER_SUCCESS:
    case REGISTER_CANCEL:
      state.step = 'login'
      return state

    default:
      return state
  }
}