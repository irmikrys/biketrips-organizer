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
      tripSelected: false
    };
  }

  handleTripChange = value => {
    axios.get(`/api/trips/${value}/participants`)
      .then((response) => {
        this.setState({
          participants: response.data,
          idTrip: value,
          tripSelected: true
        });
      })
      .catch((error) => {
        console.log(error);
      });
    this.render();
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
            <div>
              {
                Object.values(this.state.participants)
                  .map(participant => {
                    return <ParticipantRow participant={participant}
                                           tripSelected={tripSelected}
                                           glyphicon="glyphicon glyphicon-pencil"
                                           fieldsDisabled={true}
                                           create={this.props.createParticipant.bind(this)}
                    />
                  })
              }
              <ParticipantRow participant={{
                idTrip: this.state.idTrip,
                username: "",
                idActivity: 1
              }}
                              tripSelected={tripSelected}
                              glyphicon="glyphicon glyphicon-floppy-disk"
                              fieldsDisabled={false}
                              create={this.props.createParticipant.bind(this)}
              />
            </div>
            <div className="add-btn">
              <button type="button" disabled={!this.state.tripSelected}>
                <span className="glyphicon glyphicon-plus"/>
              </button>
            </div>
            <div className="save-btn">
              <button type="button">
                <span className="glyphicon glyphicon-file"/> FROM FILE
              </button>
              <button type="submit">
                <Link to={'/moderate'}>
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
