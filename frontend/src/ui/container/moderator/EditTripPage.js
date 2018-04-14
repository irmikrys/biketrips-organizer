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
        <EditTripForm trip={this.props.trip}
                      fetchTrip={this.props.fetchTrip}
                      editTrip={this.props.editTrip}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
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
