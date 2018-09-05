const initialState = {
  signIn: false,
  signUp: false,
  isRegistered: false,
  isLoggedIn: false,
  isAdmin: false
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SING_IN':
      return { ...state, signIn: true, signUp: false, isRegistered: false };
    case 'SIGN_UP':
      return { ...state, signIn: false, signUp: true, isLoggedIn: false };
    case 'ADMIN_LOGGED_IN':
      return { ...state, isAdmin: true };
    case 'USER_LOGGED_OUT':
      return { ...state, isAdmin: false, isLoggedIn: false, isRegistered: false};
    case 'USER_IS_REGISTERED':
      return { ...state, isRegistered: true, isLoggedIn: true };
    case 'USER_IS_LOGGED_IN':
      return { ...state, isLoggedIn: true };

    default:
      return state
  }
};
