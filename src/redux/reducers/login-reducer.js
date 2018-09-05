import { CHANGED_EMAIL, CHANGED_PASSWORD } from '../actions/login-actions';

const initialState = {
  email: '',
  password: '',
  formsErrors: {
    emailIsError: false,
    passwordIsError: false
  },
  emailIsValid: '',
  passwordIsValid: false,
  formIsValid: true,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGED_EMAIL:
      return { ...state, email: action.payload };
    case CHANGED_PASSWORD:
      return { ...state, password: action.payload };
    // case ADMIN_LOGGED_IN:
    //   return { ...state, isAdmin: true };
    // case USER_LOGGED_OUT:
    //   return { ...state, isAdmin: false, isLoggedIn: false, isRegistered: false};
    // case USER_IS_REGISTERED:
    //   return { ...state, isRegistered: true, isLoggedIn: true };
    // case USER_IS_LOGGED_IN:
    //   return { ...state, isLoggedIn: true };

    default:
      return state
  }
}
