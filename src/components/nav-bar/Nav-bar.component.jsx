import * as React  from 'react';
import { Link }    from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes   from 'prop-types';

import AppBar  from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/es/Toolbar/Toolbar';
import Button  from '@material-ui/core/es/Button/Button';

import { formValidationSuccess } from '../../redux/actions/login-actions';
import './Nav-bar.component.scss';

class NavBarComponent extends React.Component {


  renderUserView(isAdmin) {
    if (isAdmin) {
      return (
        <Link to={ '/settings' } className="nav-bar__button">
          <Button color="inherit">Settings</Button>
        </Link>
      );
    }
  }

  renderLoginButton(isLoggedIn, onUpdateSignIn, onUpdateSignUp, onLoggedOut) {
    if (isLoggedIn) {
      return (
        <div onClick={ () => onLoggedOut() } className="nav-bar__button_login">
          <Link to={ '/' }>
            <Button color="inherit">Log out</Button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="nav-bar__button_login">
          <Link
            className="nav-bar__button"
            to={ '/login' }
            onClick={ () => {
              onUpdateSignIn();
              this.props.formValidationSuccessActions();
            } }>
            <Button color="inherit">Sign In</Button>
          </Link>
          <Link
            className="nav-bar__button"
            to={ '/registration' }
            onClick={ () => {
              onUpdateSignUp();
              this.props.formValidationSuccessActions();
            } }>
            <Button color="inherit">Sign Up</Button>
          </Link>
        </div>
      );
    }
  }

  render() {
    const {
      onUpdateSignIn,
      onUpdateSignUp,
      isLoggedIn,
      isAdmin,
      onLoggedOut
    } = this.props;
    return (
      <div className="nav-bar-wrapper">
        <AppBar classes={ { root: 'nav-bar' } } position="static">
          <Toolbar>
            <Link to={ '/' } className="nav-bar__button">
              <Button color="inherit">Home</Button>
            </Link>
            { this.renderUserView(isAdmin) }
            { this.renderLoginButton(
              isLoggedIn,
              onUpdateSignIn,
              onUpdateSignUp,
              onLoggedOut) }

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBarComponent.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onUpdateSignIn: PropTypes.func.isRequired,
  onUpdateSignUp: PropTypes.func.isRequired,
  onLoggedOut: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    formValidationSuccessActions: () => dispatch(formValidationSuccess()),
  };
};

export default connect(null, mapDispatchToProps)(NavBarComponent);
