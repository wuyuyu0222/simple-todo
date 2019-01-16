import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from "./services/authorize/reducer";

export const store = createStore(authReducer, applyMiddleware(thunk));