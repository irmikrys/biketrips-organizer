import TripCreationForm from '../../component/forms/TripCreationForm';
import {connect} from 'react-redux';
import {fetchAvailableLevels} from "../../../reducers/trips/levels";
import {createTrip} from "../../../reducers/trips/tripCreation";

function mapStateToProps(state) {
  return {
    levels: state.levels.levels,
    username: state.authentication.username,
    updatingModerator: state.authentication.loading
  };
}

const mapActionsToProps = {
  fetchLevels: fetchAvailableLevels,
  create: createTrip
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TripCreationForm);
