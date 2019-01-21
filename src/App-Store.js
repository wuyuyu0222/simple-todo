import { createStore, combineReducers } from 'redux';

import { authReducer } from './services/authorize/Auth-Reducer';
import { todoReducer } from './services/todo/Todo-Reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer
});

export const store = createStore(rootReducer);