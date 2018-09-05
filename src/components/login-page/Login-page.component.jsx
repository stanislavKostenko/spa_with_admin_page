import * as React from 'react';
import './Login-page.component.scss';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { api } from '../api';

import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  emailFailed, emailSuccess,
  formValidationFailed,
  formValidationSuccess,
  passwordFailed, passwordSuccess,
  updateEmail,
  updatePassword
} from '../../redux/actions/login-actions';


class LoginPage extends React.Component {
  constructor(props) {
    super(props);


    this.onSubmitRegistration = this.onSubmitRegistration.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.updateRegistration = this.props.updateRegistration;
    this.updateLogin = this.props.updateLogin;
    this.updateAdmin = this.props.updateAdmin;
  }

  handleUserFields(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'email') {
      this.props.updateEmailActions(value);
    } else if (name === 'password') {
      this.props.updatePasswordActions(value);
    }
    this.validateFields(name, value)
  }

  onChangeHandler(e) {
    this.handleUserFields(e);
  }

  successValidation() {
    let empty = '';
    this.props.updateEmailActions(empty);
    this.props.updatePasswordActions(empty);
    this.updateLogin();
    this.updateRegistration();
    this.props.formValidationSuccessActions();
    this.returnToMainPage();
  }

  loginValidation(userData) {
    api.loginValidation(userData)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          this.successValidation();
        } else {
          this.props.formValidationFailedActions();
        }
      });
  }

  registrationValidation(userData) {
    api.registrationValidation(userData)
      .then((res) => {
        return res.json();
      }).then(data => {
      console.log(data);
      if (data.status === 'success') {
        this.successValidation();
      } else {
        this.props.formValidationFailedActions();
      }
    });
  }

  keyPress(e) {
    const isEnter = e.keyCode === 10 || e.keyCode === 13;
    if (isEnter && this.props.signIn) {
      this.onSubmitLogin();
    } else if (isEnter) {
      this.onSubmitRegistration()
    }
  }

  onSubmitRegistration() {
    const userData = {
      email: this.props.login.email,
      password: this.props.login.password
    };
    this.registrationValidation(userData);
  }

  onSubmitLogin() {
    if (this.props.login.email === 'admin9999@gmail.com' && this.props.login.password === 'admin9999') {
      this.updateAdmin();
    }
    const userData = {
      email: this.props.login.email,
      password: this.props.login.password
    };
    this.loginValidation(userData);
  }

  returnToMainPage() {
    this.props.history.goBack();
  }

  validateFields(fieldName, value) {
    let emailIsValid = this.props.login.emailIsValid;
    let passwordIsValid = this.props.login.passwordIsValid;

    switch (fieldName) {
      case 'email':
        emailIsValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (emailIsValid === null || emailIsValid.length !== 4) {
          this.props.emailFailedActions();
        } else {
          this.props.emailSuccessActions();
        }
        break;
      case 'password':
        passwordIsValid = value.length >= 6;
        !passwordIsValid ? this.props.passwordFailedActions() : this.props.passwordSuccessActions();
        break;
      default:
        break;
    }
  }

  render() {
    const { signIn, signUp, login } = this.props;
    const emptyString = login.email === '' && login.password === '';
    return (
      <div className="login-page">
        <Card classes={ { root: 'login-page__card' } }>
          <div className="login-page__card__header-wrapper">
            <CardHeader
              classes={ {
                title: 'login-page__card__header__title',
                root: 'login-page__card__header'
              } }
              title={ signIn ? 'Sign In' : 'Sign Up' }
            />
            <Link className="login-page__card__header__button" to={ '/' }>
              <IconButton>
                <CloseIcon/>
              </IconButton>
            </Link>
          </div>
          <CardContent classes={ { root: 'login-page__card__content' } }>
            <form action="http://localhost:8080/api/users" method="post">
              <TextField
                fullWidth={ true }
                type="email"
                label={ login.formIsValid ? 'Account with this email already exists' : 'Email' }
                name="email"
                value={ login.email }
                onChange={ this.onChangeHandler }
                error={ login.emailIsError || login.formIsValid }
              />
              <TextField
                fullWidth={ true }
                type="password"
                label={ login.passwordIsError ? 'A password should be more than 5 symbols' : 'Password' }
                name="password"
                value={ login.password }
                onChange={ this.onChangeHandler }
                error={ login.passwordIsError }
                onKeyDown={ this.keyPress }
              />
            </form>


          </CardContent>
          <CardActions classes={ { root: 'login-page__card__button-wrapper' } }>
            <Button
              onClick={
                signUp ? this.onSubmitRegistration :
                  this.onSubmitLogin
              }
              classes={ { root: 'login-page__card__submit' } }
              fullWidth={ true }
              variant="contained"
              disabled={ login.emailIsError || login.passwordIsError ||
              emptyString }
            >
              { signIn ? 'Sign In' : 'Sign Up' }
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

LoginPage.propTypes = {
  signIn: PropTypes.bool.isRequired,
  signUp: PropTypes.bool.isRequired,
  updateRegistration: PropTypes.func.isRequired,
  updateLogin: PropTypes.func.isRequired,
  updateAdmin: PropTypes.func.isRequired,
};

const mapStateToProps = store => {
  return {
    login: store.login,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateEmailActions: email => dispatch(updateEmail(email)),
    updatePasswordActions: password => dispatch(updatePassword(password)),
    formValidationSuccessActions: () => dispatch(formValidationSuccess()),
    formValidationFailedActions: () => dispatch(formValidationFailed()),
    emailSuccessActions: () => dispatch(emailSuccess()),
    passwordSuccessActions: () => dispatch(passwordSuccess()),
    emailFailedActions: () => dispatch(emailFailed()),
    passwordFailedActions: () => dispatch(passwordFailed())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));
