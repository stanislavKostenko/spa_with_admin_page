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
import { updateEmail } from '../../redux/actions/login-actions';



class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.props.login;



    this.onSubmitRegistration = this.onSubmitRegistration.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.updateRegistration = this.props.updateRegistration;
    this.updateLogin = this.props.updateLogin;
    this.updateAdmin = this.props.updateAdmin;
    this.state = {
      active: false,
      users: [],
      email: '',
      password: '',
      formsErrors: {
        email: true,
        password: '',
        emailIsError: false,
        passwordIsError: false
      },
      emailIsValid: '',
      passwordIsValid: false,
      formIsValid: true,
      signIn: this.props.signIn,
      signUp: this.props.signUp,
      isAdmin: this.props.isAdmin,

    };
  }

  handleUserFields(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
    this.validateFields(name, value)
  }

  onChangeHandler(e) {
    this.handleUserFields(e);
  }

  loginValidation() {
    if (this.state.email === 'admin9999@gmail.com' && this.state.password === 'admin9999') {
      this.updateAdmin();
    }
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    api.loginValidation(userData)
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        this.setState({
          email: '',
          password: '',
          formIsValid: true
        });
        this.updateLogin();
        this.updateRegistration();
        this.returnToMainPage();
      } else {
        this.setState({
          formIsValid: false
        });
      }
    });
  }

  registrationValidation() {
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    api.registrationValidation(userData)
    .then((res)=>{
      return res.json();
    }).then(data => {
      debugger;
      console.log(data);
      if (data.status === 'success') {
        this.setState({
          email: '',
          password: '',
          formIsValid: true
        });
        this.updateLogin();
        this.updateRegistration();
        this.returnToMainPage();
      } else {
        this.setState({
          formIsValid: false
        });
      }
    });
  }

  keyPress(e) {
    const isEnter = e.keyCode === 10 || e.keyCode === 13;
    if(isEnter && this.state.signIn) {
      this.onSubmitLogin();
    } else if(isEnter) {
      this.onSubmitRegistration()
    }
  }

  onSubmitRegistration() {
    this.registrationValidation();
  }

  onSubmitLogin() {
    this.loginValidation();
  }

  returnToMainPage() {
    this.props.history.goBack();
  }

  validateFields(fieldName, value) {
    let fieldValidationErrors = this.state.formsErrors;
    let emailIsValid = this.state.emailIsValid;
    let passwordIsValid = this.state.passwordIsValid;

    switch (fieldName) {
      case 'email':
        emailIsValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (emailIsValid === null || emailIsValid.length !== 4) {
          this.setState({
            formsErrors: {
              emailIsError: true
            }
          })
        } else {
          this.setState({
            formsErrors: {
              emailIsError: false
            }
          })
        }
        break;
      case 'password':
        passwordIsValid = value.length >= 6;
        if (!passwordIsValid) {
          this.setState({
            formsErrors: {
              passwordIsError: true
            }
          })
        } else {
          this.setState({
            formsErrors: {
              passwordIsError: false
            }
          })
        }
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailIsValid: emailIsValid,
      passwordIsValid: passwordIsValid
    })
  }

  render() {
    const { signIn, signUp } = this.props;
    const emptyString = this.state.email === '' && this.state.password === '';
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
                label={ !this.state.formIsValid ? 'Account with this email already exists' : 'Email' }
                name="email"
                value={ this.state.email }
                onChange={ this.onChangeHandler }
                error={ this.state.formsErrors.emailIsError || !this.state.formIsValid }
              />
              <TextField
                fullWidth={ true }
                type="password"
                label={ this.state.formsErrors.passwordIsError ? 'A password should be more than 5 symbols' : 'Password' }
                name="password"
                value={ this.state.password }
                onChange={ this.onChangeHandler }
                error={ this.state.formsErrors.passwordIsError }
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
              disabled={ this.state.formsErrors.emailIsError || this.state.formsErrors.passwordIsError ||
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
  updateEmailActions: PropTypes.func.isRequired
};

const mapStateToProps = store => {
  return {
    login: store.login,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateEmailActions: email => dispatch(updateEmail(email)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));
