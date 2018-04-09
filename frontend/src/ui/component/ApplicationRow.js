import React, {Component} from 'react';
import {dateFormatter} from "./utils";
import {ACTIVE, EMAIL, USERNAME} from "../constants/constants";
import axios from "axios";

export class ApplicationRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  appDTO = {
    [USERNAME]: this.props.data.username,
    [EMAIL]: this.props.data.email,
    [ACTIVE]: false
  };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    const {username} = this.props.data;
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

  handleAcceptation = event => {
    event.preventDefault();
    const {acceptModer} = this.props;
    const {deactivate} = this.props;
    const {fetchApplications} = this.props;
    this.state.user.user.role = "MODER";
    acceptModer(this.props.data.username, this.state.user.user);
    deactivate(this.props.data.username, this.state);
    fetchApplications();
  };

  handleRefusal = event => {
    event.preventDefault();
    const {deactivate} = this.props;
    const {fetchApplications} = this.props;
    deactivate(this.props.data.username, this.appDTO);
    fetchApplications();
  };

  render() {
    const application = this.props.data;
    return (
      <tr className="application">
        <td/>
        <td id="date">{dateFormatter(new Date(application.createDate))}</td>
        <td id="username">{application.username}</td>
        <td id="email">{application.email}</td>
        <td id="action">
          <div className="btn-toolbar">
            <button type="button"
                    className="btn btn-group btn-xs btn-danger"
                    onClick={this.handleRefusal}
            >
              <span className="glyphicon glyphicon-trash" aria-hidden="true"/>
            </button>
            <button type="button"
                    className="btn btn-group btn-xs btn-default"
                    onClick={this.handleAcceptation}
            >
              <span className="glyphicon glyphicon-eye-open" aria-hidden="true"/>
            </button>
          </div>
        </td>
      </tr>
    )
  }
}
