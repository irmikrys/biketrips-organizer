import React, {Component} from 'react';
import {connect} from 'react-redux';
import EditTripForm from "../../component/forms/EditTripForm";
import {fetchTripById} from "../../../reducers/trips/trip";
import {updateTrip} from "../../../reducers/trips/tripUpdate";
import {fetchAvailableStatuses} from "../../../reducers/trips/statuses";

export class EditTripPage extends Component {

  constructor(props) {
    super(props);
    props.fetchTrip(props.params.idTrip);
    props.fetchStatuses();
  }

  render() {
    return (
      <div>
        {!this.props.updating && <EditTripForm idTrip={this.props.params.idTrip}
                                               trip={this.props.trip}
                                               statuses={this.props.statuses}
                                               username={this.props.username}
                                               fetchTrip={this.props.fetchTrip}
                                               editTrip={this.props.editTrip}
        />
        }
        {this.props.updating && <div className="loader margin-top"/>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    username: state.authentication.username,
    trip: state.trip.trip,
    updating: state.trip.updating,
    statuses: state.statuses.statuses
  };
}

const mapActionsToProps = {
  fetchStatuses: fetchAvailableStatuses,
  fetchTrip: fetchTripById,
  editTrip: updateTrip
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(EditTripPage);
