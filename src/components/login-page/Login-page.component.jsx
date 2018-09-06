import * as React           from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect }          from 'react-redux';
import PropTypes            from 'prop-types';

import Card        from '@material-ui/core/Card';
import CardHeader  from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import TextField   from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import Button      from '@material-ui/core/Button';
import IconButton  from '@material-ui/core/IconButton';
import CloseIcon   from '@material-ui/icons/Close';

import { api, apiUrl } from '../api';
import './Login-page.component.scss';

import {
  emailFailed,
  emailSuccess,
  formValidationFailed,
  formValidationSuccess,
  passwordFailed,
  passwordSuccess,
  updateEmail,
  updatePassword
} from '../../redux/actions/login-actions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.onUpdateRegistration = this.props.onUpdateRegistration;
    this.onUpdateLogin = this.props.onUpdateLogin;
    this.onUpdateAdmin = this.props.onUpdateAdmin;
  }

  loginValidation(userData) {
    api.loginValidation(userData)
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
      .then(data => {
        if (data.status === 'success') {
          this.successValidation();
        } else {
          this.props.formValidationFailedActions();
        }
      });
  }

  successValidation() {
    let empty = '';
    this.props.updateEmailActions(empty);
    this.props.updatePasswordActions(empty);
    this.onUpdateLogin();
    this.onUpdateRegistration();
    this.props.formValidationSuccessActions();
    this.returnToMainPage();
  }

  registration() {
    const userData = {
      email: this.props.login.email,
      password: this.props.login.password
    };
    this.registrationValidation(userData);
  }

  login() {
    if (this.props.login.email === 'admin9999@gmail.com' &&
      this.props.login.password === 'admin9999') {
      this.onUpdateAdmin();
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
        if (passwordIsValid) {
          this.props.passwordSuccessActions();
        } else {
          this.props.passwordFailedActions();
        }
        break;
      default:
        break;
    }
  }

  labelGenerator(login, signUp) {
    if (signUp) {
      return login.formIsValid ? 'Email'
        : 'Account with this email already exists';
    } else {
      return login.formIsValid ? 'Email' : 'Wrong email or password';
    }
  }

  handleKeyPress(e) {
    const isEnter = e.keyCode === 10 || e.keyCode === 13;
    if (isEnter && this.props.signIn) {
      this.login();
    } else if (isEnter) {
      this.registration();
    }
  }

  handleUserFields(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'email') {
      this.props.updateEmailActions(value);
    } else if (name === 'password') {
      this.props.updatePasswordActions(value);
    }
    this.validateFields(name, value);
  }

  handleChangeValue(e) {
    this.handleUserFields(e);
  }

  handleSubmit(signUp) {
    if (signUp) {
      this.registration();
    } else {
      this.login();
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
            <form action={ apiUrl + '/api/users' } method="post">
              <TextField
                fullWidth={ true }
                type="email"
                label={ this.labelGenerator(login, signUp) }
                name="email"
                value={ login.email }
                error={ login.emailIsError || !login.formIsValid }
                onChange={ this.handleChangeValue.bind(this) }
              />
              <TextField
                fullWidth={ true }
                type="password"
                label={ login.passwordIsError
                  ? 'A password should be more than 5 symbols' : 'Password' }
                name="password"
                value={ login.password }
                error={ login.passwordIsError }
                onChange={ this.handleChangeValue.bind(this) }
                onKeyDown={ this.handleKeyPress.bind(this) }
              />
            </form>
          </CardContent>
          <CardActions classes={ { root: 'login-page__card__button-wrapper' } }>
            <Button
              classes={ { root: 'login-page__card__submit' } }
              fullWidth={ true }
              variant="contained"
              disabled={ login.emailIsError || login.passwordIsError ||
              emptyString }
              onClick={ this.handleSubmit.bind(this, signUp) }
            >
              { signIn ? 'Sign In' : 'Sign Up' }
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

LoginPage.propTypes = {
  signIn: PropTypes.bool.isRequired,
  signUp: PropTypes.bool.isRequired,
  onUpdateRegistration: PropTypes.func.isRequired,
  onUpdateLogin: PropTypes.func.isRequired,
  onUpdateAdmin: PropTypes.func.isRequired,
};

const mapStateToProps = store => {
  return {
    login: store.login,
  };
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(withRouter(LoginPage));
