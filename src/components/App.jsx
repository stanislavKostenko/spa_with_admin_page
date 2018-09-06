import * as React            from 'react';
import {
  HashRouter as Router,
  Route
}                            from 'react-router-dom';
import { connect }           from 'react-redux';

import './App.scss';

import NavBarComponent       from './nav-bar/Nav-bar.component';
import LoginPage             from './login-page/Login-page.component';
import { HomePageComponent } from './home-page/Home-page.component';
import AdminPageComponent    from './admin-page/Admin-page.component';

import {
  adminLoggedIn,
  updateSignIn,
  updateSignUp,
  userLoggedIn,
  userLoggedOut,
  userRegistered
}                            from '../redux/actions/app-actions';

class App extends React.Component {

  componentDidMount() {
    this.defaultLocation();
  }

  defaultLocation() {
    let currentLocation = window.location.href.split('/');
    currentLocation = currentLocation[ currentLocation.length - 1 ];
    if (currentLocation === 'login') {
      this.props.updateSignInAction();
    } else if (currentLocation === 'registration') {
      this.props.updateSignUpAction();
    }
  }

  render() {
    const {
      app,
      updateSignInAction,
      updateSignUpAction,
      adminLoggedInAction,
      userLoggedOutAction,
      userRegisteredAction,
      userLoggedInAction
    } = this.props;
    return (
      <Router>
        <div className="App">
          <NavBarComponent
            updateSignIn={ updateSignInAction }
            updateSignUp={ updateSignUpAction }
            isLoggedIn={ app.isLoggedIn }
            isAdmin={ app.isAdmin }
            loggedOut={ userLoggedOutAction }
          />
          <Route exact={ true } path="/" component={ HomePageComponent }/>
          <Route
            path={ app.signIn ? '/login' : '/registration' }
            render={ () =>
              <LoginPage
                signIn={ app.signIn }
                signUp={ app.signUp }
                updateRegistration={ userRegisteredAction }
                updateLogin={ userLoggedInAction }
                updateAdmin={ adminLoggedInAction }
              /> }
          />
          <Route path={ '/settings' } render={ () => <AdminPageComponent isAdmin={ app.isAdmin }/> }/>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = store => {
  return {
    app: store.app,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSignInAction: () => dispatch(updateSignIn()),
    updateSignUpAction: () => dispatch(updateSignUp()),
    adminLoggedInAction: () => dispatch(adminLoggedIn()),
    userLoggedOutAction: () => dispatch(userLoggedOut()),
    userRegisteredAction: () => dispatch(userRegistered()),
    userLoggedInAction: () => dispatch(userLoggedIn()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
