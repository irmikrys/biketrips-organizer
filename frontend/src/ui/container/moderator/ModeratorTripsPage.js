import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchUserTrips} from "../../../reducers/trips";
import TripsGrid from "../../component/trips/TripsGrid"

export class ModeratorTripsPage extends Component {

  constructor(props) {
    super(props);
    this.props.fetchTrips(this.props.username);
  }

  render() {
    return (
      <div className="main">
        <TripsGrid trips={this.props.trips}/>
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
  fetchTrips: fetchUserTrips
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ModeratorTripsPage)
