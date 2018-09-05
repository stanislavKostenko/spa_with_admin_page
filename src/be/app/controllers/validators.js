const Users = require('../models/users');
const { check } = require('express-validator/check');

module.exports = {
  checkUserByEmail: check('email').isEmail().trim().normalizeEmail()
  .custom((value) => {
    return findUserByEmail(value).then((user) => {
      if (!user) {
        throw new Error('email already exist');
      }
    })
  }),
  checkLoginValidationEmail: check('email').isEmail().trim().normalizeEmail()
  .custom((value) => {
    return loginValidationEmail(value).then((email) => {
      if (!email) {
        throw new Error('Email not found');
      }
    })
  }),
  checkPasswordValidation: check('password')
  .custom((value) => {
    return loginValidationPassword(value).then((password) => {
      if (!password) {
        throw new Error('Passwords don\'t match');
      }
    })
  })

};

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