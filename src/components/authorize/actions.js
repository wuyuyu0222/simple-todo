export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_CANCEL = 'REGISTER_CANCEL';


export const toLogin = () => {
  return {
    type: LOGIN
  };
}

export const login = (account, password) => {
  return (dispatch) => {
    return loginToServer(account, password).then(res => {
      dispatch({ type: LOGIN_SUCCESS });
    }, error => {
      dispatch({ type: LOGIN_FAILED });
    });
  }
}

const loginToServer = (account, password) => {
  return new Promise((resolve, reject) => {
    if (account && password) {
      resolve();
    } else {
      reject();
    }
  });
}

export const logout = () => {
  return (dispatch) => {
    return logoutToServer().then(res => {
      dispatch({ type: LOGOUT });
    });
  }
}

const logoutToServer = () => {
  return new Promise((resolve, reject) => {
    resolve();
  });
}

export const toRegister = () => {
  return {
    type: REGISTER
  };
}

export const register = (username, account, password) => {
  return (dispatch) => {
    return registerToServer(username, account, password).then(res => {
      dispatch({ type: REGISTER_SUCCESS });
    }, error => {
      dispatch({ type: REGISTER_FAILED });
    });
  }
}

const registerToServer = (username, account, password) => {
  return new Promise((resolve, reject) => {
    if (username && account && password) {
      resolve();
    } else {
      reject();
    }
  });
}