export const TO_LOGIN = 'TO_LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const TO_REGISTER = 'TO_REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_CANCEL = 'REGISTER_CANCEL';


export const toLogin = () => {
  return {
    type: TO_LOGIN
  }
}

export const loginSuccess = ({account, username}) => {
  return {
    type: LOGIN_SUCCESS,
    tempAccount: account,
    username: username
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}

export const toRegister = () => {
  return {
    type: TO_REGISTER
  };
}

export const registerSuccess = (account) => {
  return {
    type: REGISTER_SUCCESS,
    tempAccount: account,
  }
}