import { createStore, combineReducers } from 'redux';

import { authReducer } from './services/authorize/Auth-Reducer';
import { todoReducer } from './services/todo/Todo-Reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer
});

export const mapStateToProps = (type) => {
  return (state) => {
    return state[type] ? state[type] : state;
  }
}

export const store = createStore(rootReducer);