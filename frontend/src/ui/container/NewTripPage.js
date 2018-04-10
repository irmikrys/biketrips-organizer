import TripCreationForm from '../component/forms/TripCreationForm';
import {connect} from 'react-redux';
import {fetchAvailableLevels} from "../../reducers/levels";

function mapStateToProps(state) {
  return {
    levels: state.levels.levels,
    username: state.authentication.username
  };
}

const mapActionsToProps = {
    fetchLevels: fetchAvailableLevels
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TripCreationForm);
