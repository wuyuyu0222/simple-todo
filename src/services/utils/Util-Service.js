import { ajax } from 'rxjs/ajax';

import { environment } from '../../environment';

export default class UtilService {

  static getDistinctArray(array) {
    return [...(new Set(array))];
  }

  static isEmptyString(string) {
    if (string) {
      return false;
    } else {
      return true;
    }
  }

  static getData(url, queryObj) {
    const queryString = this.getQueryString(queryObj);
    return ajax.getJSON(environment.apiUrl + url + queryString);
  }

  static getQueryString(queryObj) {
    let queryString = '';
    if (queryObj && Object.keys(queryObj).length > 0) {
      queryString += '?';
      Object.keys(queryObj).map(key => {
        if (queryObj[key]) {
          queryString += `${key}=${queryObj[key]}&`;
        }
        return key
      })
    }
    queryString = queryString.slice(0, -1);
    return queryString
  }

  static upsertData(url, data) {
    return ajax.post(environment.apiUrl + url,
      JSON.stringify(data));
  }

  static deleteData(url, id) {
    return ajax.delete(environment.apiUrl + url + `/${id}`);
  }

}