export const LOADING = 'LOADING';
export const UPDATE_TODO_LIST = 'UPDATE_TODO_LIST';
export const UPDATE_CATEGORY_LIST = 'UPDATE_CATEGORY_LIST';
export const OPEN_UPSERT_TODO = 'OPEN_UPSERT_TODO';
export const CLOSE_UPSERT_TODO = 'CLOSE_UPSERT_TODO';


export const loading = () => {
  return {
    type: LOADING
  }
};

export const openUpsertTodo = (todo) => {
  return {
    type: OPEN_UPSERT_TODO,
    todo: todo
  }
}

export const closeUpsertTodo = () => {
  return {
    type: CLOSE_UPSERT_TODO
  }
}

export const updateTodoList = (todoList) => {
  return {
    type: UPDATE_TODO_LIST,
    todoList: todoList
  }
};

export const updateCategoryList = (categoryList) => {
  return {
    type: UPDATE_CATEGORY_LIST,
    categoryList: categoryList
  }
}