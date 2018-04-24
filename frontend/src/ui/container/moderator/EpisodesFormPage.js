import React, {Component} from "react";
import {connect} from "react-redux";
import EpisodesForm from "../../component/forms/EpisodesForm";
import {fetchModeratorTrips} from "../../../reducers/trips";
import {createEpisode} from "../../../reducers/createEpisode";

class EpisodesFormPage extends Component {

  componentDidMount() {
    this.props.fetchTrips();
  }

  render() {
    return (
      !this.props.updating ?
        <EpisodesForm trips={this.props.trips}
                      create={this.props.create.bind(this)}/> :
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
  fetchTrips: fetchModeratorTrips,
  create: createEpisode,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(EpisodesFormPage);
