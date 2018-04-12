import React, {Component} from "react";
import {Link} from "react-router";

class Navbar extends Component {

  getDropdown = (dropdownData) => {
    return (
      dropdownData !== null ? (
        <li className="dropdown">
          <a className="dropdown-toggle" data-toggle="dropdown" href="#">{dropdownData.label}
            <span className="caret"/></a>
          <ul className="dropdown-menu nav navbar-nav navbar-inverse">
            {
              dropdownData.children.map((item, key) => (
                <li key={key}>
                  <Link to={item.link} onClick={this.props.onClick}><span className={item.icon}/> {item.label}</Link>
                </li>
              ))
            }
          </ul>
        </li>
      ) : <div/>
    )
  };

  render() {
    const mainItems = this.props.mainItems.map((item, key) => (
      <li key={key}>
        <Link to={item.link} onClick={this.props.onClick}><span className={item.icon}/> {item.label}</Link>
      </li>
    ));
    const rightItems = this.props.rightItems.map((item, key) => (
      <li key={key}>
        <Link to={item.link} onClick={this.props.onClick}><span className={item.icon}/> {item.label}</Link>
      </li>
    ));
    const leftDropdown = this.getDropdown(this.props.leftDropdown);
    const rightDropdown = this.getDropdown(this.props.rightDropdown);
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
              {leftDropdown}
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {rightItems}
              {rightDropdown}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
