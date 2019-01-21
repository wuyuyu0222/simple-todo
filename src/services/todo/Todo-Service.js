import { map } from 'rxjs/operators';

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

  static getTodoList(keyword, category) {
    const query = {
      keyword: keyword,
      category: category === 'all' ? '' : category
    };
    return UtilService.getData(this.apiUrl, query).pipe(
      map(todoList => {
        todoList.map(todo => todo.progress = +todo.progress);
        return this.getSortTodoList(todoList);
      })
    );
  }

  static getCategoryList() {
    return UtilService.getData(this.apiUrl).pipe(
      map(todoList =>
        UtilService.getDistinctArray(
          todoList.map(todo => todo.category)
        )
      )
    );
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