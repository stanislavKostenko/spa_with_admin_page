export const EMAIL_SUCCESS = 'EMAIL_SUCCESS';
export const PASSWORD_SUCCESS = 'PASSWORD_SUCCESS';
export const PASSWORD_FAILED = 'PASSWORD_FAILED';
export const EMAIL_FAILED = 'EMAIL_FAILED';


export const updateEmail = (email) => {
  return {
    type: 'UPDATE_EMAIL',
    payload: email
  }
};
