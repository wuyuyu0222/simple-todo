import { TO_LOGIN, LOGIN_SUCCESS, LOGOUT, TO_REGISTER, REGISTER_SUCCESS } from "./Auth-Actions";
import UtilService from "../utils/Util-Service";

const initialState = {
  isAuthorized: !UtilService.isEmptyString(localStorage.getItem('user')),
  tempAccount: localStorage.getItem('tempAccount'),
  username: localStorage.getItem('user'),
  step: 'login',
}


export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthorized: true,
        tempAccount: action.tempAccount,
        username: action.username,
        step: 'loggedIn'
      }

    case TO_LOGIN:
    case LOGOUT:
      return {
        ...state,
        isAuthorized: false,
        username: '',
        step: 'login'
      }

    case TO_REGISTER:
      return {
        ...state,
        step: 'register'
      }

    case REGISTER_SUCCESS:
      return {
        ...state,
        step: 'login',
        tempAccount: action.tempAccount
      }

    default:
      return state
  }
}