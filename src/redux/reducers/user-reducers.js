const initialState = {
  editable: false,
  email: this.props.email,
  password: this.props.password,
  formsErrors: {
    emailIsError: false,
    passwordIsError: false
  }
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ('EDITABLE') :
      return { ...state, editable: true };
    case ('NOT_EDITABLE') :
      return { ...state, editable: false };
    case ('UPDATE_EMAIL') :
      return { ...state, email: action.payload};
    case ('UPDATE_PASSWORD') :
      return { ...state, password: action.payload};
    case 'EMAIL_SUCCESS':
      return { ...state, emailIsError: false };
    case 'EMAIL_FAILED':
      return { ...state, emailIsError: true };
    case 'PASSWORD_SUCCESS':
      return { ...state, passwordIsError: false };
    case 'PASSWORD_FAILED':
      return { ...state, passwordIsError: true };

    default:
      return state
  }
};