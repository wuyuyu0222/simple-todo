import { utils } from "../utils/common";

export default class TodoService {

  constructor() {
    this.apiUrl = "/todo";
  }

  getSortTodoList = (todoList) => {
    todoList.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt))
    return todoList;
  }

  getTodoList = () => {
    return utils.getData(this.apiUrl).then(res => {
      return this.getSortTodoList(res);
    });
  }

  searchTodo = (keyword, category) => {
    const query = {
      keyword: keyword,
      category: category === 'all' ? '' : category
    };
    return utils.searchData(this.apiUrl, query).then(res => {
      return this.getSortTodoList(res);
    })
  }

  upsertTodo = (todo) => {
    return utils.upsertData(this.apiUrl, todo);
  }

  deleteTodo = (id) => {
    return utils.deleteData(this.apiUrl, id);
  }
}