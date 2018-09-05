const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Users_controller = require('../controllers/usersControllers');
const User_controller = require('../controllers/userControllers');
const User_validator = require('../controllers/validators');


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
  .put(jsonParser, [User_validator.checkUserByEmail], Users_controller.put_users)
  .get(Users_controller.get_users)
  .post(jsonParser, [User_validator.checkLoginValidationEmail, User_validator.checkPasswordValidation], Users_controller.post_users);

router.route('/users/:user_id')
  .get(User_controller.get_user)
  .put(User_controller.put_user)
  .delete(User_controller.delete_user);


module.exports = router;
