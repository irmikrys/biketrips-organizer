import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchUserTrips} from "../../../reducers/trips";
import ParticipantsForm from "../../component/forms/ParticipantsForm";

class ParticipantsFormPage extends Component {

  componentDidMount() {
    this.props.fetchTrips(this.props.username);
  }

  render() {
    return (
      <ParticipantsForm trips={this.props.trips}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    trips: state.trips.trips,
    updating: state.trips.updating,
    username: state.authentication.username
  };
}

const mapActionsToProps = {
  fetchTrips: fetchUserTrips
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ParticipantsFormPage);
