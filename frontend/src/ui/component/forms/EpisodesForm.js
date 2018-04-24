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
                  .map((episode, key) => {
                    return <EpisodeRow key={key}
                                       episode={episode}
                                       tripSelected={tripSelected}
                                       fieldsDisabled={true}
                    />
                  })
              }
              <EpisodeRow tripSelected={tripSelected}
                          fieldsDisabled={false}
                          create={this.props.create.bind(this)}
                          idTrip={this.state.idTrip}
                          episode={{
                            idTrip: this.state.idTrip,
                            time: null,
                            description: ""
                          }}
              />
            </div>
            <div className="add-btn">
              <button type="button" disabled={!this.state.tripSelected}>
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
