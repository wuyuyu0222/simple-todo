import { Utils } from "../utils/common";

export default class TodoService {

  constructor() {
    this.apiUrl = "/todo";
  }

  getEmptyTodo = () => {
    return {
      title: '',
      category: '',
      progress: 0,
      content: '',
      userId: 'jakeWu'
    }
  }

  getSortTodoList = (todoList) => {
    todoList.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt))
    return todoList;
  }

  getTodoList = () => {
    return Utils.getData(this.apiUrl).then(res => {
      return this.getSortTodoList(res);
    });
  }

  searchTodo = (keyword, category) => {
    const query = {
      keyword: keyword,
      category: category === 'all' ? '' : category
    };
    return Utils.searchData(this.apiUrl, query).then(res => {
      return this.getSortTodoList(res);
    })
  }

  upsertTodo = (todo) => {
    return Utils.upsertData(this.apiUrl, todo);
  }

  deleteTodo = (id) => {
    return Utils.deleteData(this.apiUrl, id);
  }
}