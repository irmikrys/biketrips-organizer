import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchActiveApplications} from "../../reducers/activeApplications";
import {ApplicationRow} from "../component/ApplicationRow";
import {acceptModerator} from "../../reducers/acceptModerator";

export class ApplicationsPage extends Component {

  constructor(props) {
    super(props);
    props.fetchActiveApplications();
  }

  render() {
    return (
      <div className="content">
        <h2>Hello {this.props.username}, you have applications to consider!</h2>
        {
          this.props.updating
            ?
            <div className="loader"/>
            :
            <section>
              <table className="table">
                <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>From</th>
                  <th>Email</th>
                  <th/>
                </tr>
                </thead>
                <tbody>
                {Object.values(this.props.applications)
                  .filter(row => {
                    return row.active === true
                  })
                  .map(row => {
                    return <ApplicationRow key={row.username}
                                           data={row}
                                           acceptModer={this.props.acceptModerator.bind(row, row.username)}
                    />
                  })}
                </tbody>
              </table>
            </section>
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
  {fetchActiveApplications, acceptModerator}
)(ApplicationsPage);
