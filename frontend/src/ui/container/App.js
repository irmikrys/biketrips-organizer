import React, {Component} from "react";
import {connect} from "react-redux";
import {getSession, setRegisterSuccess, displayAuthError} from "../../reducers/authentication";
import "stylus/main.styl";
import axios from 'axios';
import {
  ADMIN_RIGHT_ITEMS,
  GUEST_RIGHT_ITEMS,
  MENU_FOR_ADMIN,
  MENU_FOR_GUEST,
  MENU_FOR_MODERATOR,
  MENU_FOR_USER,
  MODERATOR_RIGHT_ITEMS,
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

  getMainMenu = () => {
    const {role} = this.state;
    const {isAuthenticated} = this.props;
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

  getSideMenu = () => {
    const {role} = this.state;
    const {isAuthenticated} = this.props;
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

  clearErrorMessages = () => {
    this.props.displayAuthError(null);
    this.props.setRegisterSuccess(false);
  };

  render() {
    const {isAuthenticated} = this.props;

    if (isAuthenticated) {
      this.getUser();
      if (this.state.user != null) {
        const {role} = this.state.user.user;
        this.state.role = role;
      }
    }

    const menuItems = this.getMainMenu();
    const sideItems = this.getSideMenu();
    return (
      <div id="application">
        <Navbar onClick={this.clearErrorMessages.bind(this)} mainItems={menuItems} rightItems={sideItems}/>
        {this.props.children}
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.authentication.isAuthenticated,
    username: state.authentication.username
  }),
  {getSession, setRegisterSuccess, displayAuthError}
)(App);
