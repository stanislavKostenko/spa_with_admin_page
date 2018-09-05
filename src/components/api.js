export const apiUrl = 'http://localhost:8080';
let myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

export const api = {
    getUsers: () => {
    return fetch(apiUrl + '/api/users',{
      method: 'GET'
    })
  },
  loginValidation: (userData) => {
  return fetch(apiUrl + '/api/users/',
    {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(userData)
    })
},
registrationValidation: (userData) => {
  return fetch(apiUrl + '/api/users/',
    {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(userData)
    })
},
deleteUser: (id) => {
  return fetch(apiUrl + '/api/users/' + id,
    {
      method: 'DELETE'
    })
},
changeUserProps: (userData, id) => {
  return fetch(apiUrl + '/api/users/' + id,
    {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(userData)
    })
}
};

