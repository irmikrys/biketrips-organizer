import React, {Component} from "react";
import {connect} from "react-redux";
import EpisodesForm from "../../component/forms/EpisodesForm";
import {fetchModeratorActiveTrips} from "../../../reducers/trips/tripsActive";
import {createEpisode} from "../../../reducers/episodes/createEpisode";

class EpisodesFormPage extends Component {

  constructor(props) {
    super(props);
    this.props.fetchTrips();
  }

  render() {
    console.log(this.props);
    return (
      !this.props.updating ?
        <EpisodesForm trips={this.props.trips}
                      create={this.props.create.bind(this)}/> :
        <div className="loader margin-top"/>
    );
  }
}

function mapStateToProps(state) {
  return {
    trips: state.tripsActive.trips,
    updating: state.tripsActive.updating,
    username: state.authentication.username
  };
}

const mapActionsToProps = {
  fetchTrips: fetchModeratorActiveTrips,
  create: createEpisode,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(EpisodesFormPage);
