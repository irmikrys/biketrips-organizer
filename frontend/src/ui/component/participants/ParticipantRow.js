import React, {Component} from "react";
import {ErrorPanel} from "../forms/ErrorPanel";

class ParticipantRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUsername: this.props.participant.username
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    const {participant} = this.props;
    const {errorMessage} = this.props;
    const errorPanel = errorMessage ? <ErrorPanel messageKey={errorMessage}/> : null;
    return (
      <form onSubmit={this.handleSubmit}>
        {errorPanel}
        <div className="participant-row">
          <div id="description">
            <input placeholder="username"
                   name="currentUsername"
                   value={participant.username}
                   disabled={this.props.fieldsDisabled}
                   onChange={this.props.handleInputChange}
                   required
            />
          </div>
          <button type="submit" disabled={!this.props.tripSelected}>
            <span className={this.props.glyphicon}/>
          </button>
        </div>
      </form>
    )
  }

}

export default ParticipantRow;
