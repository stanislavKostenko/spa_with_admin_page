export const EMAIL_SUCCESS = 'EMAIL_SUCCESS';
export const PASSWORD_SUCCESS = 'PASSWORD_SUCCESS';
export const PASSWORD_FAILED = 'PASSWORD_FAILED';
export const EMAIL_FAILED = 'EMAIL_FAILED';
export const CHANGED_EMAIL = 'CHANGED_EMAIL';
export const CHANGED_PASSWORD = 'CHANGED_PASSWORD';

export const changedEmail = (email) => {
  return {
    type: 'CHANGED_EMAIL',
    payload: email
  }
};

export const changedPassword = (password) => {
  return {
    type: 'CHANGED_PASSWORD',
    payload: password
  }
};
