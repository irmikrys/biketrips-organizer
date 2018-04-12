import React, {Component} from "react";
import {connect} from "react-redux";
import EpisodesForm from "../../component/forms/EpisodesForm";
import {fetchUserTrips} from "../../../reducers/trips";

class EpisodesFormPage extends Component {

  componentDidMount() {
    this.props.fetchTrips(this.props.username);
  }

  render() {
    return (
      !this.props.updating ?
        <EpisodesForm trips={this.props.trips}/> :
        <div className="loader"/>
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
)(EpisodesFormPage);
