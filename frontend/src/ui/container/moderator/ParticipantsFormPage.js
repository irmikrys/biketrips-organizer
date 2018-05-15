import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchModeratorActiveTrips} from "../../../reducers/trips/tripsActive";
import ParticipantsForm from "../../component/forms/ParticipantsForm";
import {createParticipant} from "../../../reducers/participants/participant";

class ParticipantsFormPage extends Component {

  constructor(props) {
    super(props);
    props.fetchTrips();
  }

  render() {
    return (
      <div>
        {
          !this.props.updating && <ParticipantsForm trips={this.props.trips}
                                                    createParticipant={this.props.create.bind(this)}
                                                    errorMessage={this.props.errorMessage}
          />
        }
        {
          this.props.updating && <div className="loader margin-top"/>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    trips: state.tripsActive.trips,
    updating: state.tripsActive.updating,
    username: state.authentication.username,
    isAuthenticated: state.authentication.isAuthenticated,
    errorMessage: state.participant.errorMessage
  };
}

const mapActionsToProps = {
  fetchTrips: fetchModeratorActiveTrips,
  create: createParticipant
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ParticipantsFormPage);
