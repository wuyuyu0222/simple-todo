export default class AuthService {

  static login = (account, password) => {
    return new Promise((resolve, reject) => {
      if (account && password) {
        const username = 'jakeWu';
        localStorage.setItem('user', username);
        localStorage.setItem('tempAccount', account);
        resolve({ account, username });
      } else {
        reject();
      }
    });
  }

  static logout = () => {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('user');
      resolve();
    });
  }

  static register = (username, account, password) => {
    return new Promise((resolve, reject) => {
      if (username && account && password) {
        localStorage.setItem('tempAccount', account);
        resolve(account);
      } else {
        reject();
      }
    });
  }
}