import React, {Component} from "react";

class ParticipantRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      currentParticipant: null,
    }
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleInputChange = event => {
    let value = event.target.value;
    let inputName = event.target.name;
    this.setState({[inputName]: value});
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    const {participant} = this.props;
    const {currentParticipant} = this.state;
    let participantData = currentParticipant === null ? participant : currentParticipant;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="participant-row">
          <div id="description">
            <input onChange={this.handleInputChange}
                   placeholder="email"
                   type="email"
                   name="email"
                   value={participantData.email == null ? participantData.username : participantData.email}
                   disabled={this.props.fieldsDisabled}
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
