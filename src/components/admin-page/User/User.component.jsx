import * as React from 'react';

import Card        from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button      from '@material-ui/core/Button';
import TextField   from '@material-ui/core/TextField';

import './User.component.scss';

export class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      email: this.props.email,
      password: this.props.password,
      formsErrors: {
        emailIsError: false,
        passwordIsError: false
      }
    };
  }

  editableUser() {
    const { emailIsError, passwordIsError } = this.state.formsErrors;
    if (emailIsError || passwordIsError) {
      return;
    }
    this.setState({
      editable: !this.state.editable
    });
  }

  validateFields(fieldName, value) {
    let emailIsValid;
    let passwordIsValid;

    switch (fieldName) {
      case 'email':
        emailIsValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        this.setState({
          formsErrors: {
            emailIsError: emailIsValid === null || emailIsValid.length !== 4
          }
        });
        break;
      case 'password':
        passwordIsValid = value.length >= 6;
        this.setState({
          formsErrors: {
            passwordIsError: !passwordIsValid
          }
        });
        break;
      default:
        break;
    }
  }

  inputSwitch(editable, emailIsError, passwordIsError, isAdmin) {
    if (editable) {
      return (
        <CardContent className="user__card__content">
          <TextField
            fullWidth={ true }
            type="email"
            label="Email"
            placeholder="email"
            name="email"
            value={ this.state.email }
						error={ emailIsError }
						disabled={ isAdmin }
						onChange={ this.handleChangeValue.bind(this) }/>
          <TextField
            fullWidth={ true }
            type="string"
            label="password:"
            placeholder="password"
            name="password"
            value={ this.state.password }
						error={ passwordIsError }
						onChange={ this.handleChangeValue.bind(this) }/>
          <span className="user__card__content__id">User ID: { this.props._id }</span>
        </CardContent>
      );
    } else {
      return (
        <CardContent className="user__card__content">
          <span className="user__card__content__email">Email: { this.props.email }</span>
          <span className="user__card__content__password">Password: { this.props.password }</span>
          <span className="user__card__content__id">User ID: { this.props._id }</span>
        </CardContent>
      );

    }
  }

  handleEditableSwitch(id, data) {
    const { editable, email, password } = this.state;
    const { passwordIsError, emailIsError } = this.state.formsErrors;
    if (editable) {
      this.props.onUpdateUser(id, data, email, password, passwordIsError, emailIsError);
    }
    this.editableUser();
  }

  handleChangeValue(e) {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'email') {
      this.setState({
        email: value
      });
    } else {
      this.setState({
        password: value
      });
    }

    this.validateFields(name, value);
  }

  render() {
    const { email, _id, data, onDeleteUser } = this.props;
    const { editable } = this.state;
    const { passwordIsError, emailIsError } = this.state.formsErrors;
    const isAdmin = 'admin9999@gmail.com' === email;
    return (
      <div className="user">
        <Card className="user__card">
          { this.inputSwitch(editable, emailIsError, passwordIsError, isAdmin) }
          <CardActions className="user__card__actions">
            <Button className="user__card__actions__button"
                    variant="contained"
                    color="primary"
                    onClick={ () => this.handleEditableSwitch(_id, data) }
            >
              { editable ? 'Save' : 'Edit' }
            </Button>
            <Button className="user__card__actions__button"
                    variant="contained"
                    color="secondary"
                    disabled={ isAdmin }
                    onClick={ () => onDeleteUser(_id, data) }
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
