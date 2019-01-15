import { Environment } from '../environment';

export const Common = {
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

export const Utils = {
  getTodoList: () => {
    return fetch(Environment.apiUrl + '/todo').then(res => res.json());
  },
  getTodo: (id) => {
    return fetch(Environment.apiUrl + `/todo/${id}`).then(res => res.json());
  },
  searchTodo: (keyword, category) => {
    let query = '';
    if (keyword && category === 'all') {
      query = `?keyword=${keyword}`;
    }
    if (!keyword && (category && category !== 'all')) {
      query = `?category=${category}`;
    }
    if (keyword && (category && category !== 'all')) {
      query = `?keyword=${keyword}&category=${category}`
    }
    return fetch(Environment.apiUrl + `/todo${query}`).then(res => res.json())
  },
  upsertTodo: (todo) => {
    return fetch(Environment.apiUrl + '/todo', {
      method: 'POST',
      body: JSON.stringify(todo)
    }).then(res => res.json())
  },
  deleteTodo: (id) => {
    return fetch(Environment.apiUrl + `/todo/${id}`, {
      method: 'DELETE'
    }).then(res => res.json())
  }
}
