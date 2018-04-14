import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ApplicationRow} from "../../component/ApplicationRow";
import {fetchActiveApplications} from "../../../reducers/activeApplications";
import {acceptModerator} from "../../../reducers/acceptModerator";
import {deactivateApplication} from "../../../reducers/deactivateApplication";

export class ApplicationsPage extends Component {

  constructor(props) {
    super(props);
    props.fetchApplications();
  }

  render() {
    console.log(this.props);
    console.log(this.props.applications.length);
    return (
      <div className="main">
        {
          this.props.applications.length === 0 && <h2>You have no active applications...</h2>
        }
        {
          this.props.applications.length !== 0 &&
          <div>
            <h2>Hello {this.props.username}, you have applications to consider!</h2>
            {
              this.props.updating
                ?
                <div className="loader"/>
                :
                <section>
                  <table className="table">
                    <thead className="content-center">
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>From</th>
                      <th>Email</th>
                      <th/>
                    </tr>
                    </thead>
                    <tbody className="content-left">
                    {Object.values(this.props.applications)
                      .map(row => {
                        return <ApplicationRow key={row.username}
                                               data={row}
                                               acceptModer={this.props.accept.bind(this)}
                                               deactivate={this.props.deactivate.bind(this)}
                                               fetchApplications={this.props.fetchApplications.bind(this)}
                        />
                      })}
                    </tbody>
                  </table>
                </section>
            }
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.authentication.username,
    isAuthenticated: state.authentication.isAuthenticated,
    applications: state.activeApplications.applications,
    updating: state.activeApplications.updating
  };
}

const mapActionsToProps = {
  fetchApplications: fetchActiveApplications,
  accept: acceptModerator,
  deactivate: deactivateApplication
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ApplicationsPage);
