const Users = require('../models/users');

exports.get_user = (req, res) => {
  Users.find((err, users) => {
    err ? res.send(err) : res.json(users);
  });
};

exports.put_user = (req, res) => {
  Users.findById(req.params.user_id, (err, user) => {
    if (err) {
      res.send(err);
    }
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err) => {
      err ? res.send(err) : res.json({ message: 'User updated' });
    });
  });
};

exports.delete_user = (req, res) => {
  Users.remove({
    _id: req.params.user_id
  }, (err) => {
    err ? res.send(err) : res.json({ message: 'Successfully deleted' });
  });
};
