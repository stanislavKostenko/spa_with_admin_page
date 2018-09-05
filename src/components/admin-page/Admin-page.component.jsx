import * as React from 'react'
import { UserComponent } from './User/User.component';
import './Admin-page.component.scss';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { api } from '../api';

const maxCountOfUsers = 4;

export class AdminPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.isAdmin = this.props.isAdmin;
    this.state = {
      data: [],
      editable: false,
      emailIsValid: true,
      passwordIsValid: true,
      startItem: 0,
      endItem: maxCountOfUsers,
      nextDisable: false,
      prevDisable: true
    };
    this.deleteUser = this.deleteUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.changeUserProps = this.changeUserProps.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.renderUsers = this.renderUsers.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.isNextButtonEnable = this.isNextButtonEnable.bind(this);
  }

  componentDidMount() {
    if (this.isAdmin) {
      this.getUsers()
    }
  }

  isNextButtonEnable(data) {
    if (data.length <= maxCountOfUsers) {
      this.setState({
        nextDisable: true
      })
    }
  }

  getUsers() {
    api.getUsers().then((res) => {
      return res.json()
    }).then((data) => {
      this.isNextButtonEnable(data);
      this.setState({ data })
    });
  }

  deleteUser(id) {
    let newData = this.state.data;
    newData = newData.filter((item) => item._id !== id);
    fetch(`http://localhost:8080/api/users/${id}`,
      {
        method: 'DELETE'
      }).then((res) => {
      return res.json()
    });
    this.isNextButtonEnable(newData);
    this.setState({
      data: newData
    })
  }

  updateUser(id, email, password, passwordIsError, emailIsError) {
    let newData = this.state.data;
    newData = newData.map((user) => {
      if (user._id === id) {
        user.email = email;
        user.password = password;

      }
      return user;
    });
    this.setState({
      data: newData
    });
    if (!passwordIsError || !emailIsError) {
      this.changeUserProps(email, password, id);
    }

  }

  changeUserProps(email, password, id) {
    const userData = {
      email: email,
      password: password
    };
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch(`http://localhost:8080/api/users/${id}`,
      {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(userData)
      })
      .then((res) => {
        return res.json();
      }).then(data => {
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

  handleNext() {
    let disabled = false;
    if (this.state.startItem + maxCountOfUsers >= this.state.data.length - maxCountOfUsers) {
      disabled = true
    }
    this.setState({
      startItem: this.state.startItem + maxCountOfUsers,
      nextDisable: disabled,
      endItem: this.state.endItem + maxCountOfUsers,
      prevDisable: false
    })
  }

  handlePrev() {
    let prevDisable = false;
    let nextDisable = false;
    if (!(this.state.startItem - maxCountOfUsers)) {
      prevDisable = true;
    }
    if (this.state.data.length <= maxCountOfUsers) {
      nextDisable = true;
    }
    this.setState({
      startItem: this.state.startItem - maxCountOfUsers,
      prevDisable: prevDisable,
      endItem: this.state.endItem - maxCountOfUsers,
      nextDisable: nextDisable
    })
  }


  renderUsers(data, start, end) {
    return (
      data.map((user, i) => {
        if (start <= i && i < end) {
          return <li className="admin-page__user-list__item" key={ user._id }>
            <UserComponent
              data={ data }
              email={ user.email }
              password={ user.password }
              _id={ user._id }
              deleteUser={ this.deleteUser }
              updateUser={ this.updateUser }/>
          </li>
        }
      })

    )
  }

  render() {
    const { isAdmin } = this.props;
    const { data, nextDisable, prevDisable, startItem, endItem } = this.state;
    return (
      <div className="admin-page">

        { isAdmin &&
        <div>
          <Button className="admin-page__button--prev"
                  variant="contained"
                  color="primary"
                  disabled={ prevDisable }
                  onClick={ () => {
                    this.handlePrev()
                  } }
          >
            Prev
          </Button>
          <ul className="admin-page__user-list">
            { this.renderUsers(data, startItem, endItem) }
          </ul>
          <Button className="admin-page__button--next"
                  variant="contained"
                  color="secondary"
                  disabled={ nextDisable }
                  onClick={ () => {
                    this.handleNext()
                  } }
          >
            Next
          </Button>
        </div> }
      </div>
    )
  }
}

AdminPageComponent.propTypes = {
  isAdmin: PropTypes.bool.isRequired
};
