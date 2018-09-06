const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateEmail = function (email) {

  const re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

  return re.test(email);

};

const UsersSchema = new Schema({
  email: {
    type: String,
    validate: [ validateEmail, 'Please fill a valid email address' ],
    match: [ /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i, 'Please fill a valid email address' ],
    index: { unique: true, dropDups: true }
  },
  password: { type: String, required: [ true, 'Password cannot be left blank' ] }
});

module.exports = mongoose.model('User', UsersSchema);
