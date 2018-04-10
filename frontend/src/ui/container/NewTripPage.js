import TripCreationForm from '../component/forms/TripCreationForm';
import {connect} from 'react-redux';
import {fetchAvailableLevels} from "../../reducers/levels";
import {createTrip} from "../../reducers/tripCreation";

function mapStateToProps(state) {
  return {
    levels: state.levels.levels,
    username: state.authentication.username
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
