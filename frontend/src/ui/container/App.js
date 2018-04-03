import React, { Component } from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { getSession } from "../../reducers/authentication";
import "stylus/main.styl";
import {
  MENU_FOR_GUEST, MENU_FOR_USER, MENU_FOR_ADMIN, USER_RIGHT_ITEMS,
  GUEST_RIGHT_ITEMS, ADMIN_RIGHT_ITEMS
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

  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const {isAuthenticated, username} = this.props;
    const menuItems = isAuthenticated ? (
      username === 'admin' ? MENU_FOR_ADMIN : MENU_FOR_USER
      ) : MENU_FOR_GUEST;
    const sideItems = isAuthenticated ? (
      username === 'admin' ? ADMIN_RIGHT_ITEMS : USER_RIGHT_ITEMS
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
