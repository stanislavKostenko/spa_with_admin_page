const Users = require('../models/users');
const { validationResult } = require('express-validator/check');

exports.get_users = (req, res) => {
  Users.find((err, users) => {
    err ? res.send(err) : res.json(users);
  })
};

exports.put_users = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ status: 'error', message: errors.array() });
  } else {

    const document = {
      email: req.body.email,
      password: req.body.password,
    };

    const user = new Users(document);
    user.save((err) => {
      console.log(user);
      if (err) {
        throw err;
      } else {
        res.json({ message: 'Data saved successfully.', status: 'success' });
      }
    })
  }
};

exports.post_users = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({ status: 'error', message: errors.array() });
  } else {
    res.json({ status: 'success', message: 'Hello' });
  }
};
