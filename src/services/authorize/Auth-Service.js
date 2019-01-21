import { Observable } from 'rxjs';

import UtilService from "../utils/Util-Service";

export default class AuthService {

  static get isAuthorized() {
    const user = localStorage.getItem('user');
    return !UtilService.isEmptyString(user);
  }

  static login(account, password) {
    return Observable.create(observer => {
      if (account && password) {
        const username = 'jakeWu';
        localStorage.setItem('user', username);
        localStorage.setItem('tempAccount', account);
        observer.next({ account, username })
      } else {
        observer.error('')
      }
      observer.complete();
    });
  }

  static logout() {
    return Observable.create(observer => {
      localStorage.removeItem('user');
      observer.next();
      observer.complete();
    })
  }

  static register(username, account, password) {
    return Observable.create(observer => {
      if (username && account && password) {
        localStorage.setItem('tempAccount', account);
        observer.next();
      } else {
        observer.error('');
      }
      observer.complete();
    })
  }
}