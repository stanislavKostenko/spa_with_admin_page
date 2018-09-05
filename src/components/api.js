export const apiUrl = 'http://localhost:8080';

export const api = {
  getUsers: () => {
    return fetch(apiUrl + '/api/users',{
        method: 'GET'
    })
  }
};
