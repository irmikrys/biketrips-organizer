import React, {Component} from "react";
import {ErrorPanel} from "../forms/ErrorPanel";
import axios from 'axios';

class ParticipantRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      submitted: this.props.submitted,
      deleted: this.props.deleted,
      errorMessage: "",
    };
  }

  handleInputChange = event => {
    event.preventDefault();
    let value = event.target.value;
    let inputName = event.target.name;
    this.setState({[inputName]: value});
  };

  addParticipant = participantInfo => {
    axios.post(`/api/trips/${participantInfo.idTrip}/participants`, participantInfo)
      .catch((error) => {
        console.log(error);
        this.setState({
          errorMessage: error.data.messageKey
        });
      });
  };

  handleSubmit = event => {
    this.setState({
      errorMessage: ""
    });
    event.preventDefault();
    const username = this.state.username;
    const idTrip = this.props.participant.idTrip;
    const idActivity = 1;
    const participantInfo = {
      username,
      idTrip,
      idActivity
    };
    this.addParticipant(participantInfo);
    this.setState({
      submitted: true
    });
    console.log(this.state.errorMessage);
  };

  handleDelete = event => {
    event.preventDefault();
    const {idTrip} = this.props.participant;
    const username = this.props.participant.username === "" ? this.state.username : this.props.participant.username;
    if (this.state.submitted) {
      axios.delete(`/api/trips/${idTrip}/participants/${username}`);
    }
    this.setState({
      deleted: true
    })
  };

  render() {
    const username = this.state.username === "" ? this.props.participant.username : this.state.username;
    const {errorMessage} = this.state;
    const {deleted, submitted} = this.state;
    const errorPanel = errorMessage && submitted ? <ErrorPanel messageKey={errorMessage}/> : null;
    return (
      <div>
        {
          deleted && null
        }
        {
          !deleted && submitted && !errorPanel &&
          <div>
            <div className="participant-row">
              <div id="description">
                <input placeholder="username"
                       value={username}
                       disabled={true}
                />
              </div>
              <button
                onClick={this.handleDelete}
                disabled={!this.props.tripSelected}
                className="form-trash"
              >
                <span className="glyphicon glyphicon-trash"/>
              </button>

            </div>
            {errorPanel}
          </div>
        }
        {
          !deleted && (!submitted || (submitted && errorPanel)) &&
          <form onSubmit={this.handleSubmit}>
            <div className="participant-row">
              <div id="description">
                <input placeholder="username"
                       name="username"
                       value={this.state.username}
                       disabled={false}
                       onChange={this.handleInputChange}
                       required
                />
              </div>
              <button
                type="submit"
                disabled={!this.props.tripSelected}
                className="form-disk"
              >
                <span className="glyphicon glyphicon-floppy-disk"/>
              </button>
              <button
                onClick={this.handleDelete}
                disabled={!this.props.tripSelected}
                className="form-trash"
              >
                <span className="glyphicon glyphicon-trash"/>
              </button>
            </div>
            {errorPanel}
          </form>
        }
      </div>
    )
  }

}

export default ParticipantRow;
