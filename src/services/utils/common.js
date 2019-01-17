import { environment } from '../../environment';

export const common = {
  getDistinctArray: (array) => {
    return [...(new Set(array))];
  },
  isEmptyString: (string) => {
    if (string) {
      return false;
    } else {
      return true;
    }
  }
}

export const utils = {
  getData: (url) => {
    return fetch(environment.apiUrl + url).then(res => res.json())
  },
  searchData: (url, queryObj) => {
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
    return fetch(environment.apiUrl + url + queryString).then(res => res.json())
  },
  upsertData: (url, data) => {
    return fetch(environment.apiUrl + url, {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json())
  },
  deleteData: (url, id) => {
    return fetch(environment.apiUrl + url + `/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
  }
}
