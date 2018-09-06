import { combineReducers } from 'redux';
import { appReducer }      from './app-reducer';
import { loginReducer }    from './login-reducer';
import { adminReducer }    from './admin-reducers';

export const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  admin: adminReducer
});
