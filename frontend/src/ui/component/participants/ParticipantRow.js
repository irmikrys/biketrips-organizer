import React, {Component} from "react";
import {ErrorPanel} from "../forms/ErrorPanel";

class ParticipantRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      submitted: this.props.submitted
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

  render() {
    const {participant} = this.props;
    const {errorMessage} = this.props;
    const errorPanel = errorMessage ? <ErrorPanel messageKey={errorMessage}/> : null;
    return (
      <div>
        {
          this.state.submitted && !errorPanel &&
          <div>
            <div className="participant-row">
              <div id="description">
                <input placeholder="username"
                       value={participant.username}
                       disabled={true}
                />
              </div>
              <button
                onClick={this.props.deleteRow}
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
          (!this.state.submitted || (this.state.submitted && errorPanel)) &&
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
            </div>
            {errorPanel}
          </form>
        }
      </div>
    )
  }

}

export default ParticipantRow;
