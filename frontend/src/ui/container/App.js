import React, {Component} from "react";
import {Link} from "react-router";
import {connect} from "react-redux";
import {getSession} from "../../reducers/authentication";
import "stylus/main.styl";
import axios from 'axios';
import {
  ADMIN_RIGHT_ITEMS,
  GUEST_RIGHT_ITEMS,
  MENU_FOR_ADMIN,
  MENU_FOR_GUEST, MENU_FOR_MODERATOR,
  MENU_FOR_USER, MODERATOR_RIGHT_ITEMS,
  USER_RIGHT_ITEMS
} from "../constants/constants";

const TopMenu = (props) => {
  const mainItems = props.mainItems.map((item, key) => (
    <li key={key}>
      <Link to={item.link}>{item.label}</Link>
    </li>
  ));
  const rightItems = props.rightItems.map((item, key) => (
    <li key={key}>
      <Link to={item.link}><span className={item.icon}/> {item.label}</Link>
    </li>
  ));
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span className="icon-bar"/>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
          </button>
          <a className="navbar-brand" href="/">Bike Trips Organizer</a>
        </div>
        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            <li className="active"><a href="/">Home</a></li>
            {mainItems}
          </ul>
          <ul className="nav navbar-nav navbar-right">
            {rightItems}
          </ul>
        </div>
      </div>
    </nav>
  );
};

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
        <TopMenu mainItems={menuItems} rightItems={sideItems}/>
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
