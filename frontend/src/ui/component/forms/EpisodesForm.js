import React, {Component} from "react";
import Select from "react-select";
import axios from 'axios';
import {Link} from "react-router";
import EpisodeRow from "../episodes/EpisodeRow";

export default class EpisodesForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      idTrip: "",
      tripSelected: false
    };
  }

  handleTripChange = value => {
    axios.get(`/api/trips/${value}/episodes`)
      .then((response) => {
        this.setState({
          episodes: response.data,
          idTrip: value,
          tripSelected: true
        });
      })
      .catch((error) => {
        console.log(error);
      });
    this.render();
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    const {tripSelected} = this.state;
    return (
      <div className="form-page">
        <div className="episodes-form-container">
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
                Object.values(this.state.episodes)
                  .map(episode => {
                    return <EpisodeRow episode={episode}
                                       tripSelected={tripSelected}
                                       glyphicon="glyphicon glyphicon-pencil"
                                       fieldsDisabled={true}
                    />
                  })
              }
              <EpisodeRow episode={{
                idTrip: this.state.idTrip,
                time: null,
                description: ""
              }}
                          tripSelected={tripSelected}
                          glyphicon="glyphicon glyphicon-floppy-disk"
                          fieldsDisabled={false}
              />
            </div>
            <div className="add-btn">
              <button type="button" disabled={!this.state.tripSelected}>
                <span className="glyphicon glyphicon-plus"/>
              </button>
            </div>
            <div className="save-btn">
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
