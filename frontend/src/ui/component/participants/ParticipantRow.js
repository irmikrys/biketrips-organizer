import React, {Component} from "react";
import {ErrorPanel} from "../forms/ErrorPanel";
import axios from 'axios';

class ParticipantRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      submitted: this.props.submitted,
      deleted: this.props.deleted
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const {create} = this.props;
    const username = this.props.participant.username;
    const idTrip = this.props.participant.idTrip;
    const idActivity = 1;
    const participantInfo = {
      username,
      idTrip,
      idActivity
    };
    create(idTrip, participantInfo);
    this.setState({
      submitted: true
    });
  };

  handleDelete = event => {
    event.preventDefault();
    const {username, idTrip} = this.props.participant;
    if(this.state.submitted) {
      axios.delete(`/api/trips/${idTrip}/participants/${username}`);
    }
    this.setState({
      deleted: true
    })
  };

  //fixme add error message only to at-the-moment submitting rows
  render() {
    const {participant} = this.props;
    const {errorMessage} = this.props;
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
                       value={participant.username}
                       disabled={true}
                />
              </div>
              <button
                onClick={this.handleDelete}
                disabled={!this.props.tripSelected}
                style={{background: "red"}}
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
                       name="currentUsername"
                       value={participant.username}
                       disabled={false}
                       onChange={this.props.handleInputChange}
                       required
                />
              </div>
              <button
                type="submit"
                disabled={!this.props.tripSelected}
                style={{background: "#088A29"}}
              >
                <span className="glyphicon glyphicon-floppy-disk"/>
              </button>
              <button
                onClick={this.handleDelete}
                disabled={!this.props.tripSelected}
                style={{background: "red"}}
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
