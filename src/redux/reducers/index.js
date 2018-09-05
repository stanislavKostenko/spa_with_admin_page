import { combineReducers } from 'redux';
import { appReducer } from './app-reducer';
import { loginReducer } from './login-reducer';

export const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
})
