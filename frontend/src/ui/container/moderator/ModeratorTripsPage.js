import React, {Component} from 'react';
import {connect} from "react-redux";
import TripsGrid from "../../component/trips/TripsGrid"
import {fetchUserTrips} from "../../../reducers/trips";
import {fetchTripById} from "../../../reducers/trip";
import {updateTrip} from "../../../reducers/tripUpdate";

export class ModeratorTripsPage extends Component {

  constructor(props) {
    super(props);
    this.props.fetchTrips(this.props.username);
  }

  render() {
    return (
      <div className="main">
        <h2>Hello, these are your Trips!</h2>
        <div className="trip-grid">
          <TripsGrid trips={this.props.trips}
                     fetchTrip={this.props.fetchTrip}
                     editTrip={this.props.editTrip}
          />
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    username: state.authentication.username,
    trips: state.trips.trips,
    updating: state.trips.updating
  };
}

const mapActionsToProps = {
  fetchTrips: fetchUserTrips,
  fetchTrip: fetchTripById,
  editTrip: updateTrip
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ModeratorTripsPage)
