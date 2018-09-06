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
    case 'UPDATE_EMAIL':
      return { ...state, email: action.payload };
    case 'UPDATE_PASSWORD':
      return { ...state, password: action.payload };
    case 'FORM_VALIDATION_SUCCESS':
      return { ...state, formIsValid: true };
    case 'FORM_VALIDATION_FAILED':
      return { ...state, formIsValid: false };
    case 'EMAIL_SUCCESS':
      return { ...state, emailIsError: false };
    case 'EMAIL_FAILED':
      return { ...state, emailIsError: true };
    case 'PASSWORD_SUCCESS':
      return { ...state, passwordIsError: false };
    case 'PASSWORD_FAILED':
      return { ...state, passwordIsError: true };

    default:
      return state;
  }
};


