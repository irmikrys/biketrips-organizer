import React, {Component} from "react";
import {connect} from "react-redux";
import {getSession} from "../../reducers/authentication";
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

  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const {isAuthenticated} = this.props;

    if (isAuthenticated) {
      this.getUser();
      const {role} = this.state.user.user;
      this.state.role = role;
    }
    const {role} = this.state;

    const menuItems = isAuthenticated ? (
      role === 'ADMIN' ? MENU_FOR_ADMIN :
        (role === 'USER' ? MENU_FOR_USER :
          MENU_FOR_MODERATOR)
    ) : MENU_FOR_GUEST;

    const sideItems = isAuthenticated ? (
      role === 'ADMIN' ? ADMIN_RIGHT_ITEMS :
        (role === 'USER' ? USER_RIGHT_ITEMS :
          MODERATOR_RIGHT_ITEMS)
    ) : GUEST_RIGHT_ITEMS;

    return (
      <div id="application">
        <Navbar mainItems={menuItems} rightItems={sideItems}/>
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
  {getSession}
)(App);
