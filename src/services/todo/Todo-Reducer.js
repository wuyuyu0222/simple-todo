import { LOADING, OPEN_UPSERT_TODO, CLOSE_UPSERT_TODO, UPDATE_TODO_LIST, UPDATE_CATEGORY_LIST } from "./Todo-Actions";

const initialState = {
  todoList: [],
  categoryList: [],
  keyword: '',
  category: 'all',
  selectedTodo: {},
  isUpsert: false,
  isLoading: false
}

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      }

    case OPEN_UPSERT_TODO:
      return {
        ...state,
        selectedTodo: action.todo,
        isUpsert: true
      }

    case CLOSE_UPSERT_TODO:
      return {
        ...state,
        isUpsert: false
      }

    case UPDATE_TODO_LIST:
      return {
        ...state,
        todoList: action.todoList,
        isLoading: false
      }

    case UPDATE_CATEGORY_LIST:
      return {
        ...state,
        categoryList: action.categoryList,
        isLoading: false
      }

    default:
      return state
  }
}