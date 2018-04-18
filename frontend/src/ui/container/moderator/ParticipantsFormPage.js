import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchModeratorTrips} from "../../../reducers/trips";
import ParticipantsForm from "../../component/forms/ParticipantsForm";
import {createParticipant} from "../../../reducers/participant";

class ParticipantsFormPage extends Component {

  componentDidMount() {
    this.props.fetchTrips();
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
    trips: state.trips.trips,
    updating: state.trips.updating,
    username: state.authentication.username,
    isAuthenticated: state.authentication.isAuthenticated,
    errorMessage: state.participant.errorMessage
  };
}

const mapActionsToProps = {
  fetchTrips: fetchModeratorTrips,
  create: createParticipant
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ParticipantsFormPage);
