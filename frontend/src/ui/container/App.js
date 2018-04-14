import React, {Component} from "react";
import {connect} from "react-redux";
import {displayAuthError, getSession, setRegisterSuccess} from "../../reducers/authentication";
import "stylus/main.styl";
import axios from 'axios';
import {
  ADMIN_RIGHT_ITEMS,
  GUEST_RIGHT_ITEMS,
  LEFT_DROPDOWN_ADMIN,
  LEFT_DROPDOWN_GUEST,
  LEFT_DROPDOWN_MODER,
  LEFT_DROPDOWN_USER,
  MENU_FOR_ADMIN,
  MENU_FOR_GUEST,
  MENU_FOR_MODERATOR,
  MENU_FOR_USER,
  MODERATOR_RIGHT_ITEMS,
  RIGHT_DROPDOWN_ADMIN,
  RIGHT_DROPDOWN_GUEST,
  RIGHT_DROPDOWN_MODER,
  RIGHT_DROPDOWN_USER,
  USER_RIGHT_ITEMS
} from "../constants/constants";
import Navbar from "../component/Navbar";

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      role: undefined
    }
  }

  componentDidMount() {
    this.props.getSession();
  }

  getUser = () => {
    const {username} = this.props;
    axios.get(`/api/users/${username}`)
      .then((response) => {
        this.setState({
          user: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getMainMenu = (role, isAuthenticated) => {
    if (isAuthenticated) {
      switch (role) {
        case 'ADMIN' :
          return MENU_FOR_ADMIN;
        case 'USER' :
          return MENU_FOR_USER;
        case 'MODER' :
          return MENU_FOR_MODERATOR;
      }
    }
    return MENU_FOR_GUEST;
  };

  getSideMenu = (role, isAuthenticated) => {
    if (isAuthenticated) {
      switch (role) {
        case 'ADMIN' :
          return ADMIN_RIGHT_ITEMS;
        case 'USER' :
          return USER_RIGHT_ITEMS;
        case 'MODER' :
          return MODERATOR_RIGHT_ITEMS;
      }
    }
    return GUEST_RIGHT_ITEMS;
  };

  getLeftDropdown = (role, isAuthenticated) => {
    if (isAuthenticated) {
      switch (role) {
        case 'ADMIN' :
          return LEFT_DROPDOWN_ADMIN;
        case 'USER' :
          return LEFT_DROPDOWN_USER;
        case 'MODER' :
          return LEFT_DROPDOWN_MODER;
      }
    }
    return LEFT_DROPDOWN_GUEST;
  };

  getRightDropdown = (role, isAuthenticated) => {
    if (isAuthenticated) {
      switch (role) {
        case 'ADMIN' :
          return RIGHT_DROPDOWN_ADMIN;
        case 'USER' :
          return RIGHT_DROPDOWN_USER;
        case 'MODER' :
          return RIGHT_DROPDOWN_MODER;
      }
    }
    return RIGHT_DROPDOWN_GUEST;
  };

  clearErrorMessages = () => {
    this.props.displayAuthError(null);
    this.props.setRegisterSuccess(false);
  };

  render() {
    const {isAuthenticated} = this.props;
    const {role} = this.state;
    if (isAuthenticated) {
      this.getUser();
      if (this.state.user != null) {
        const {role} = this.state.user.user;
        this.state.role = role;
      }
    }

    const menuItems = this.getMainMenu(role, isAuthenticated);
    const sideItems = this.getSideMenu(role, isAuthenticated);
    const leftDropdown = this.getLeftDropdown(role, isAuthenticated);
    const rightDropdown = this.getRightDropdown(role, isAuthenticated);

    return (
      <div id="application">
        <Navbar onClick={this.clearErrorMessages.bind(this)}
                mainItems={menuItems}
                rightItems={sideItems}
                leftDropdown={leftDropdown}
                rightDropdown={rightDropdown}
        />
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    username: state.authentication.username
  };
}

const mapActionsToProps = {
  getSession,
  setRegisterSuccess,
  displayAuthError
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
