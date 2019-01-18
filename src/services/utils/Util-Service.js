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

  static getData(url) {
    return fetch(environment.apiUrl + url).then(res => res.json())
  }

  static searchData(url, queryObj) {
    const queryString = this.getQueryString(queryObj);
    return fetch(environment.apiUrl + url + queryString).then(res => res.json())
  }

  getQueryString(queryObj) {
    let queryString = '';
    if (Object.keys(queryObj).length > 0) {
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
    return fetch(environment.apiUrl + url, {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json())
  }

  static deleteData(url, id) {
    return fetch(environment.apiUrl + url + `/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
  }

}