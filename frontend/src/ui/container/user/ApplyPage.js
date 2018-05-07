import ApplyForm from '../../component/forms/ApplyForm';
import {connect} from 'react-redux';
import {apply} from '../../../reducers/applications/apply';

export default connect(
  state => ({
    errorMessage: state.apply.errorMessage
  }),
  {apply}
)(ApplyForm);
