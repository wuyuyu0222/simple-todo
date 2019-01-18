import UtilService from "../utils/Util-Service";

export default class TodoService {

  static apiUrl = '/todo'

  static getEmptyTodo() {
    return {
      title: '',
      category: '',
      progress: 0,
      content: '',
      userId: 'jakeWu'
    }
  }

  static getTodoList() {
    return UtilService.getData(this.apiUrl).then(res => {
      res.map(todo => todo.progress = +todo.progress);
      return this.getSortTodoList(res);
    });
  }

  static searchTodo(keyword, category) {
    const query = {
      keyword: keyword,
      category: category === 'all' ? '' : category
    };
    return UtilService.searchData(this.apiUrl, query).then(res => {
      res.map(todo => todo.progress = +todo.progress);
      return this.getSortTodoList(res);
    })
  }

  static getSortTodoList(todoList) {
    todoList.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt))
    return todoList;
  }

  static upsertTodo(todo) {
    return UtilService.upsertData(this.apiUrl, todo);
  }

  static deleteTodo(id) {
    return UtilService.deleteData(this.apiUrl, id);
  }
}