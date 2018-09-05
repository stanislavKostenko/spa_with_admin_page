import * as React from 'react'
import './User.component.scss'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export class UserComponent extends React.Component {
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
    this.editableUser = this.editableUser.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.editableSwitch = this.editableSwitch.bind(this);
  }

  editableUser() {
    const { emailIsError, passwordIsError } = this.state.formsErrors;
    if( emailIsError || passwordIsError ) {
      return
    }
    this.setState({
      editable: !this.state.editable
    })
  }

  onChangeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    if (name === 'email') {
      this.setState({
        email: value
      })
    } else {
      this.setState({
        password: value
      })
    }

    this.validateFields(name, value);
  }


  validateFields(fieldName, value) {
    let emailIsValid;
    let passwordIsValid;

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
        this.setState({
          formsErrors: {
            passwordIsError: !passwordIsValid
          }
        })
        break;
      default:
        break;
    }
  }

  inputSwitch(editable , emailIsError, passwordIsError, isAdmin) {
    if (editable) {
      return (
        <CardContent className="user__card__content">
          <TextField
            fullWidth={ true }
            type="email"
            label="Email"
            placeholder="email"
            name="email"
            onChange={ this.onChangeHandler }
            value={ this.state.email }
            error={ emailIsError }
            disabled={isAdmin}/>
          <TextField
            fullWidth={ true }
            type="string"
            label="password:"
            placeholder="password"
            name="password"
            onChange={ this.onChangeHandler }
            value={ this.state.password }
            error={ passwordIsError }/>
          <span className="user__card__content__id">User ID: { this.props._id }</span>
        </CardContent>
      )
    } else {
      return (
        <CardContent className="user__card__content">
          <span className="user__card__content__email">Email: { this.props.email }</span>
          <span className="user__card__content__password">Password: { this.props.password }</span>
          <span className="user__card__content__id">User ID: { this.props._id }</span>
        </CardContent>
      )

    }
  }

  editableSwitch(id, data) {
    const { editable, email, password} = this.state;
    const { passwordIsError, emailIsError } = this.state.formsErrors;
    if (editable) {
      this.props.updateUser(id, data, email, password, passwordIsError, emailIsError);
    }
    this.editableUser();
  }

  render() {
    const { email, password, _id, deleteUser, data } = this.props;
    const { editable } = this.state;
    const { passwordIsError, emailIsError } = this.state.formsErrors;
    const isAdmin = 'admin9999@gmail.com' === email;
    return (
      <div className="user">
        <Card className="user__card">
          {this.inputSwitch(editable, emailIsError, passwordIsError, isAdmin)}
          <CardActions className="user__card__actions">
              <Button className="user__card__actions__button"
                      variant="contained"
                      color="primary"
                      onClick={ () => {this.editableSwitch(_id, data)} }
              >
                {editable ? "Save" : "Edit"}
              </Button>
            <Button className="user__card__actions__button"
                    variant="contained"
                    color="secondary"
                    disabled={isAdmin}
                    onClick={ () => deleteUser(_id, data) }
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}
