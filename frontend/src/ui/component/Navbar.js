import React, {Component} from "react";
import {Link} from "react-router";

class Navbar extends Component {

  render() {
    const mainItems = this.props.mainItems.map((item, key) => (
      <li key={key}>
        <Link to={item.link}>{item.label}</Link>
      </li>
    ));
    const rightItems = this.props.rightItems.map((item, key) => (
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
  }
}

export default Navbar;
