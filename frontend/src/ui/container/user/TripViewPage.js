import React, {Component} from 'react';
import {connect} from 'react-redux';
import TripView from "../../component/trips/TripView";
import {fetchTripById} from "../../../reducers/trip";

export class TripViewPage extends Component {

  constructor(props) {
    super(props);
    props.fetchTrip(props.params.idTrip);
  }

  render() {

    return (
      <div className="main">
        <h1>Trip</h1>
        {!this.props.updating && <TripView trip={this.props.trip}
                                           levels={this.props.levels}
                                           username={this.props.username}
                                           fetchTrip={this.props.fetchTrip}
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
    levels: state.levels.levels
  };
}

const mapActionsToProps = {
  fetchTrip: fetchTripById
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TripViewPage);
