import * as React  from 'react';
import { connect } from 'react-redux';
import PropTypes   from 'prop-types';

import Button from '@material-ui/core/Button';

import { User } from './User/User.component';
import { api }  from '../api';

import './Admin-page.component.scss';

import {
	deleteDataItem,
	nextButtonDisable,
	nextButtonEnable,
	prevButtonDisable,
	prevButtonEnable,
	updateData,
	updateDataItem,
	updateEndItem,
	updateStartItem
} from '../../redux/actions/admin-actions';
import {
	formValidationFailed,
	formValidationSuccess,
	updateEmail,
	updatePassword
} from '../../redux/actions/login-actions';

export const maxCountOfUsers = 4;

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.isAdmin = this.props.isAdmin;
  }

  componentDidMount() {
    if (this.isAdmin) {
      this.getUsers();
    }
  }

  isNextButtonEnable(data) {
    if (data.length <= maxCountOfUsers) {
      this.props.nextButtonDisableActions();
    }
  }

  getUsers() {
    api.getUsers().then(data => {
      this.isNextButtonEnable(data);
      this.props.updateDataActions(data);
    });
  }

  successValidation() {
    let empty = '';
    this.props.updateEmailActions(empty);
    this.props.updatePasswordActions(empty);
    this.props.formValidationSuccessActions();
  }

  changeUserProps(email, password, id) {
    const userData = {
      email: email,
      password: password
    };
    api.changeUserProps(userData, id)
      .then(data => {
        if (data.status === 'success') {
          this.successValidation();
        } else {
          this.props.formValidationFailedActions();
        }
      });
  }

  handleDeleteUser(id, data) {
    const newData = data.filter(item => item._id !== id);
    api.deleteUser(id);
    this.isNextButtonEnable(newData);
    this.props.deleteDataItemActions(newData);
  };

  handleUpdateUser(id, data, email, password, passwordIsError, emailIsError) {
    const newData = data.map((user) => {
      if (user._id === id) {
        user.email = email;
        user.password = password;
      }
      return user;
    });
    this.props.updateDataItemActions(newData);
    if (!passwordIsError || !emailIsError) {
      this.changeUserProps(email, password, id);
    }
  };

  handleNext(admin) {
    if (admin.startItem + maxCountOfUsers >= admin.data.length - maxCountOfUsers) {
      this.props.nextButtonDisableActions();
    }
    let startItem = this.props.admin.startItem + maxCountOfUsers;
    this.props.updateStartItemActions(startItem);
    let endItem = this.props.admin.endItem + maxCountOfUsers;
    this.props.updateEndItemActions(endItem);
    this.props.prevButtonEnableActions();
  }

  handlePrev(admin) {
    if (!( admin.startItem - maxCountOfUsers )) {
      this.props.prevButtonDisableActions();
    }
    if (admin.data.length <= maxCountOfUsers) {
      this.props.nextButtonDisableActions();
    } else {
      this.props.nextButtonEnableActions();
    }

    let startItem = this.props.admin.startItem - maxCountOfUsers;
    this.props.updateStartItemActions(startItem);
    let endItem = this.props.admin.endItem - maxCountOfUsers;
    this.props.updateEndItemActions(endItem);
  }

  renderUsers(data, start, end) {
    return (
      data.map((user, i) => {
        const userRangeCheck = start <= i && i < end;
        if (userRangeCheck) {
          return (
            <li className="admin-page__user-list__item" key={ user._id }>
              <User
								_id={ user._id }
								data={ data }
								email={ user.email }
								password={ user.password }
                onDeleteUser={ this.handleDeleteUser.bind(this) }
                onUpdateUser={ this.handleUpdateUser.bind(this) }/>
            </li>
          );
        }
        return null;
      })

    );
  }

  render() {
    const { isAdmin, admin } = this.props;
    return (
      <div className="admin-page">
        { isAdmin &&
        <div>
          <Button className="admin-page__button--prev"
                  variant="contained"
                  color="primary"
                  disabled={ admin.prevDisable }
                  onClick={ () => this.handlePrev(admin) }
          >
            Prev
          </Button>
          <ul className="admin-page__user-list">
            { this.renderUsers(admin.data, admin.startItem, admin.endItem) }
          </ul>
          <Button className="admin-page__button--next"
                  variant="contained"
                  color="secondary"
                  disabled={ admin.nextDisable }
                  onClick={ () => this.handleNext(admin) }
          >
            Next
          </Button>
        </div> }
      </div>
    );
  }
}

AdminPage.propTypes = {
  isAdmin: PropTypes.bool.isRequired
};

const mapStateToProps = store => {
  return {
    admin: store.admin,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDataActions: data => dispatch(updateData(data)),
    updateDataItemActions: data => dispatch(updateDataItem(data)),
    deleteDataItemActions: data => dispatch(deleteDataItem(data)),
    updateEmailActions: email => dispatch(updateEmail(email)),
    updatePasswordActions: password => dispatch(updatePassword(password)),
    formValidationSuccessActions: () => dispatch(formValidationSuccess()),
    formValidationFailedActions: () => dispatch(formValidationFailed()),
    nextButtonDisableActions: () => dispatch(nextButtonDisable()),
    nextButtonEnableActions: () => dispatch(nextButtonEnable()),
    prevButtonDisableActions: () => dispatch(prevButtonDisable()),
    prevButtonEnableActions: () => dispatch(prevButtonEnable()),
    updateStartItemActions: item => dispatch(updateStartItem(item)),
    updateEndItemActions: item => dispatch(updateEndItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
