const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../models/users');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator/check');


const jsonParser = bodyParser.json();

mongoose.connect('mongodb://127.0.0.1:27017');

router.use((req, res, next) => {
  console.log('Something is happening');
  next();
});

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to our API' })
});

router.route('/users')
  .put(jsonParser, [
      check('email').isEmail().trim().normalizeEmail()
        .custom((value) => {
          return findUserByEmail(value).then((user) => {
            if (!user) {
              throw new Error('email already exist');
            }
          })
        }),
    ],
    (req, res) => {
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

    }
  )
  .get((req, res) => {
    Users.find((err, users) => {
      err ? res.send(err) : res.json(users);
    })
  })
  .post(jsonParser, [
    check('email').isEmail().trim().normalizeEmail()
      .custom((value) => {
        return loginValidationEmail(value).then((email) => {
          if (!email) {
            throw new Error('Email not found');
          }
        })
      }),
    check('password')
      .custom((value) => {
        return loginValidationPassword(value).then((password) => {
          if (!password) {
            throw new Error('Passwords don\'t match');
          }
        })

      })
  ], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ status: 'error', message: errors.array() });
    } else {
      res.json({ status: 'success', message: 'Hello' });
    }
  });

router.route('/users/:user_id')
  .get((req, res) => {
    Users.findById(req.params.user_id, (err, user) => {
      err ? res.send(err) : res.json(user);
    });
  })
  .put((req, res) => {
    Users.findById(req.params.user_id, (err, user) => {
      if (err) {
        res.send(err);
      }
      user.email = req.body.email;
      user.password = req.body.password;
      user.save((err) => {
        err ? res.send(err) : res.json({ message: 'User updated' })
      })
    })
  })
  .delete((req, res) => {
    Users.remove({
      _id: req.params.user_id
    }, (err, user) => {
      err ? res.send(err) : res.json({ message: 'Successfully deleted' })
    })
  });

function findUserByEmail(email) {
  if (email) {
    return new Promise((resolve, reject) => {
      Users.findOne({ email: email })
        .exec((err, doc) => {
          if (err) return reject(err);
          if (doc) return reject(new Error('This email already exists. Please enter another email.'));
          else return resolve(email)
        })
    })
  }
}

function loginValidationEmail(email) {
  if (email) {
    return new Promise((resolve, reject) => {
      Users.findOne({ email: email })
        .exec((err, doc) => {
          if (err) return reject(err);
          if (doc) return resolve(email);
          else return reject(new Error('Can not found this email'));
        })
    })
  }
}

function loginValidationPassword(password) {
  if (password) {
    return new Promise((resolve, reject) => {
      Users.findOne({ password: password })
        .exec((err, doc) => {
          if (err) return reject(err);
          if (doc) return resolve(password);
          else return reject(new Error('Wrong password'));
        })
    })
  }
}

module.exports = router;
