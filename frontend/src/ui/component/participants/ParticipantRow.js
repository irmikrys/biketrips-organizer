import React, {Component} from "react";
import axios from "axios";

class ParticipantRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idActivity: 1,
      currentParticipant: {}
    }
  }

  componentDidMount() {
    console.log(this.props);
    const {idTrip, username} = this.props.participant;
    if (idTrip !== undefined && idTrip !== null && username !== undefined && username !== null) {
      axios.get(`/api/trips/${idTrip}/participants/${username}`)
        .then((response) => {
          this.setState({
            currentParticipant: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    const {participant} = this.props;
    const {currentParticipant} = this.state;
    let participantData = currentParticipant == null ? participant : currentParticipant;
    console.log(this.state);
    return (
      <form>
        <div className="participant-row">
          <div id="description">
            <input placeholder="email"
                   type="email"
                   value={participantData.email == null ? participantData.username : participantData.email}
                   disabled={this.props.fieldsDisabled}
                   required
            />
          </div>
          <button type="button" disabled={!this.props.tripSelected}>
            <span className={this.props.glyphicon}/>
          </button>
        </div>
      </form>
    )
  }

}

export default ParticipantRow;
