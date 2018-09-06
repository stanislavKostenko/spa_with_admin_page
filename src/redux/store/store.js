import { applyMiddleware, createStore } from 'redux';
import { rootReducer }                  from '../reducers/index';
import logger                           from 'redux-logger';
import thunk                            from 'redux-thunk';
/* eslint-disable no-underscore-dangle */
export const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */
