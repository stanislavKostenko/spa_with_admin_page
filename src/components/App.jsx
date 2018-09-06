import * as React                      from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect }                     from 'react-redux';

import NavBar       from './nav-bar/Nav-bar.component';
import LoginPage    from './login-page/Login-page.component';
import { HomePage } from './home-page/Home-page.component';
import AdminPage    from './admin-page/Admin-page.component';

import {
	adminLoggedIn,
	updateSignIn,
	updateSignUp,
	userLoggedIn,
	userLoggedOut,
	userRegistered
} from '../redux/actions/app-actions';

import './App.scss';

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
					<NavBar
						isLoggedIn={ app.isLoggedIn }
						isAdmin={ app.isAdmin }
						onLoggedOut={ userLoggedOutAction }
						onUpdateSignIn={ updateSignInAction }
						onUpdateSignUp={ updateSignUpAction }
					/>
					<Route exact={ true } path="/" component={ HomePage }/>
					<Route
						path={ app.signIn ? '/login' : '/registration' }
						render={ () =>
							<LoginPage
								signIn={ app.signIn }
								signUp={ app.signUp }
								onUpdateRegistration={ userRegisteredAction }
								onUpdateLogin={ userLoggedInAction }
								onUpdateAdmin={ adminLoggedInAction }
							/> }
					/>
					<Route path={ '/settings' }
								 render={ () => <AdminPage isAdmin={ app.isAdmin }/> }/>
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
