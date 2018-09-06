import * as React                from 'react';
import { Link }                  from 'react-router-dom';
import './Nav-bar.component.scss';
import AppBar                    from '@material-ui/core/AppBar';
import Toolbar                   from '@material-ui/core/es/Toolbar/Toolbar';
import Button                    from '@material-ui/core/es/Button/Button';
import PropTypes                 from 'prop-types';
import { formValidationSuccess } from '../../redux/actions/login-actions';
import { connect }               from 'react-redux';

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

  renderLoginButton(isLoggedIn, updateSignIn, updateSignUp, loggedOut) {
    if (isLoggedIn) {
      return (
        <div onClick={ () => loggedOut() } className="nav-bar__button_login">
          <Link to={ '/' }>
            <Button color="inherit">Log out</Button>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="nav-bar__button_login">
          <Link
            onClick={ () => {
              updateSignIn();
              this.props.formValidationSuccessActions();
            } }
            className="nav-bar__button"
            to={ '/login' }>
            <Button color="inherit">Sign In</Button>
          </Link>
          <Link
            onClick={ () => {
              updateSignUp();
              this.props.formValidationSuccessActions();
            } }
            className="nav-bar__button"
            to={ '/registration' }>
            <Button color="inherit">Sign Up</Button>
          </Link>
        </div>
      );
    }
  }

  render() {
    const { updateSignIn, updateSignUp, isLoggedIn, isAdmin, loggedOut } = this.props;
    return (
      <div className="nav-bar-wrapper">
        <AppBar classes={ { root: 'nav-bar' } } position="static">
          <Toolbar>
            <Link to={ '/' } className="nav-bar__button">
              <Button color="inherit">Home</Button>
            </Link>
            { this.renderUserView(isAdmin) }
            { this.renderLoginButton(isLoggedIn, updateSignIn, updateSignUp, loggedOut) }

          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBarComponent.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  updateSignIn: PropTypes.func.isRequired,
  updateSignUp: PropTypes.func.isRequired,
  loggedOut: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    formValidationSuccessActions: () => dispatch(formValidationSuccess()),
  };
};

export default connect(null, mapDispatchToProps)(NavBarComponent);
