import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchActiveApplications} from "../../reducers/activeApplications";
import {Applications} from "../component/Applications";

export class ApplicationsPage extends Component {

  constructor(props) {
    super(props);
    props.fetchActiveApplications();
  }

  render() {
    return (
      <div className="main">
        <h2>Hello {this.props.username}, you have applications to consider!</h2>
        {
          this.props.updating
            ?
            <div className="loader"/>
            :
            <Applications applications={this.props.applications}
                          fetchApplications={this.props.fetchActiveApplications}
            />
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    username: state.authentication.username,
    isAuthenticated: state.authentication.isAuthenticated,
    applications: state.activeApplications.applications,
    updating: state.activeApplications.updating
  }),
  {fetchActiveApplications}
)(ApplicationsPage);
