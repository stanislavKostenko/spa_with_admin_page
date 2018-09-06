export const apiUrl = 'http://localhost:8080';
let myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

export const api = {
  getUsers: () => fetch(apiUrl + '/api/users', { method: 'GET' })
  .then((res) => res.json()),

  loginValidation: (userData) => fetch(apiUrl + '/api/users',
      {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(userData),
      }).then(res => res.json()),

  registrationValidation: (userData) => fetch(apiUrl + '/api/users',
      {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(userData),
      }).then((res) => res.json()),

  deleteUser: (id) =>  fetch(apiUrl + '/api/users/' + id, { method: 'DELETE', })
  .then((res) => res.json()),

  changeUserProps: (userData, id) => fetch(apiUrl + '/api/users/' + id,
      {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(userData),
      }).then((res) => res.json())
};

