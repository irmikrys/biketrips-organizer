import React, {Component} from 'react';
import {connect} from 'react-redux';
import EditTripForm from "../../component/forms/EditTripForm";
import {fetchTripById} from "../../../reducers/trip";
import {updateTrip} from "../../../reducers/tripUpdate";

export class EditTripPage extends Component {

  constructor(props) {
    super(props);
    props.fetchTrip(props.params.idTrip)
  }

  render() {
    return (
      <div>
        {!this.props.updating && <EditTripForm idTrip={this.props.params.idTrip}
                                               trip={this.props.trip}
                                               username={this.props.username}
                                               fetchTrip={this.props.fetchTrip}
                                               editTrip={this.props.editTrip}
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
    updating: state.trip.updating
  };
}

const mapActionsToProps = {
  fetchTrip: fetchTripById,
  editTrip: updateTrip
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(EditTripPage);
