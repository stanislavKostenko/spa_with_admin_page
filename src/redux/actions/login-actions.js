export const updateEmail = (email) => {
  return {
    type: 'UPDATE_EMAIL',
    payload: email
  };
};

export const updatePassword = (password) => {
  return {
    type: 'UPDATE_PASSWORD',
    payload: password
  };
};

export const formValidationSuccess = () => {
  return {
    type: 'FORM_VALIDATION_SUCCESS'
  };
};

export const formValidationFailed = () => {
  return {
    type: 'FORM_VALIDATION_FAILED'
  };
};

export const emailSuccess = () => {
  return {
    type: 'EMAIL_SUCCESS'
  };
};


export const emailFailed = () => {
  return {
    type: 'EMAIL_FAILED'
  };
};

export const passwordSuccess = () => {
  return {
    type: 'PASSWORD_SUCCESS'
  };
};

export const passwordFailed = () => {
  return {
    type: 'PASSWORD_FAILED'
  };
};
