import React, {Component} from 'react';
import Select from "react-select";

export default class EditTripForm extends Component {

  constructor(props) {
    super(props);

    const trip = props.trip;
    this.state = {
      name: trip.name,
      description: trip.description,
      moderator: trip.moderator,
      startDate: trip.startDate,
      endDate: trip.endDate,
      idLevel: trip.idLevel,
      idStatus: trip.idStatus,
      points: trip.points
    };
  }

  handleInputChange = event => {
    let value = event.target.value;
    let inputName = event.target.name;
    this.setState({[inputName]: value});
  };

  handleSubmit = event => {
    event.preventDefault();
    const {editTrip, trip, fetchTrip} = this.props;
    editTrip(trip.idTrip, this.state, fetchTrip);
  };

  render() {
    return (
      <div>
        <div className="container edit-modal edit-trip-modal">
          <div className="details">
            <div className="paragraph">
              <div className="paragraph-title trip-form">
                <h3>Edit Trip</h3>
                <div>
                  <input placeholder="name"
                         name="name"
                         value={this.state.name}
                         onChange={this.handleInputChange}
                         required
                  />
                  <textarea placeholder="description..."
                            name="description"
                            value={this.state.description}
                            onChange={this.handleInputChange}
                            cols="40"
                            rows="5"
                            required
                  />
                  <input placeholder="points"
                         name="points"
                         pattern="[1-9].[0-9]{0,2}"
                         value={this.state.points}
                         onChange={this.handleInputChange}
                         required
                  />
                  <Select
                  />
                  <button type="button" onClick={this.handleSubmit.bind(this)}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

}
