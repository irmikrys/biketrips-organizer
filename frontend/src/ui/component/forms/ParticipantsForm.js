import React, {Component} from "react";
import Select from "react-select";
import axios from 'axios';
import {Link} from "react-router";
import ParticipantRow from "../participants/ParticipantRow";

export default class ParticipantsForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      idTrip: 0,
      tripSelected: false,
      children: []
    };
  }

  getTripParticipants = idTrip => {
    axios.get(`/api/trips/${idTrip}/participants`)
      .then((response) => {
        this.setState({
          participants: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleTripChange = value => {
    this.getTripParticipants(value);
    this.setState({
      idTrip: value,
      tripSelected: true,
      children: []
    });
  };

  addRow = () => {
    this.setState({
      children: this.state.children.concat([
        {
          idTrip: this.state.idTrip,
          username: "",
          idActivity: 1
        }
      ])
    });
  };

  render() {
    const {tripSelected} = this.state;
    return (
      <div className="form-page">
        <div className="participants-form-container">
          <div>
            <Select simpleValue
                    placeholder="trip"
                    clearable={false}
                    value={this.state.idTrip}
                    onChange={this.handleTripChange}
                    options={this.props.trips.map(item => {
                      return {value: item.idTrip, label: item.name}
                    })}
            />
            <div id="participants-rows">
              {
                Object.values(this.state.participants)
                  .map((participant, key) => {
                    return <ParticipantRow key={key}
                                           tripSelected={tripSelected}
                                           submitted={true}
                                           deleted={false}
                                           participant={participant}
                    />
                  })
              }
              {
                Object.values(this.state.children)
                  .map((child, key) => {
                    return <ParticipantRow key={key}
                                           tripSelected={tripSelected}
                                           submitted={false}
                                           deleted={false}
                                           create={this.props.createParticipant}
                                           // errorMessage={this.props.errorMessage}
                                           participant={child}
                    />
                  })
              }
            </div>
            <div className="add-btn">
              <button type="button"
                      disabled={!this.state.tripSelected}
                      onClick={this.addRow}
              >
                <span className="glyphicon glyphicon-plus"/>
              </button>
            </div>
            <div className="save-btn">
              <button type="submit">
                <Link to={'/moderator-trips'}>
                  <span className="glyphicon glyphicon-ok"/> OK
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
