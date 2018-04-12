import React, {Component} from "react";
import {connect} from 'react-redux';
import {fetchAllTrips} from "../../reducers/trips";
import TripBoardView from "../component/TripBoardView";

export class TripsPage extends Component {

  constructor(props) {
    super(props);
    this.props.fetchTrips();
  }

  render() {
    console.log(this.props);
    return (
      <div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    trips: state.trips.trips,
    updating: state.trips.updating,
  };
}

const mapActionsToProps = {
  fetchTrips: fetchAllTrips
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TripsPage);
