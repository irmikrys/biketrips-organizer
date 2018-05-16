import React, {Component} from "react";
import Select from "react-select";
import axios from 'axios';
import {Link} from "react-router";
import EpisodeRow from "../episodes/EpisodeRow";
import {dateFormatter} from "../utils";

export default class EpisodesForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      idTrip: 0,
      tripSelected: false,
      children: []
    };
  }

  handleTripChange = value => {
    axios.get(`/api/trips/${value}/episodes`)
      .then((response) => {
        this.setState({
          episodes: response.data,
          idTrip: value,
          tripSelected: true,
          children: []
        });
      })
      .catch((error) => {
        console.log(error);
      });
    this.render();
  };

  addRow = () => {
    this.setState({
      children: this.state.children.concat([
        {
          idTrip: this.state.idTrip,
          description: "",
          time: null
        }
      ])
    });
  };

  render() {
    const {tripSelected} = this.state;
    console.log(this.state.episodes);
    return (
      <div className="form-page">
        <div className="episodes-form-container">
          <div>
            <Select simpleValue
                    placeholder="trip"
                    clearable={false}
                    value={this.state.idTrip}
                    onChange={this.handleTripChange}
                    options={this.props.trips.map(trip => {
                      return {
                        value: trip.idTrip,
                        label: trip.name + ', ' + dateFormatter(new Date(trip.startDate)) + ' - ' + dateFormatter(new Date(trip.endDate))
                      }
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
                                       submitted={true}
                    />
                  })
              }
              {
                Object.values(this.state.children)
                  .map((child, key) => {
                    return <EpisodeRow key={key}
                                       tripSelected={tripSelected}
                                       submitted={false}
                                       deleted={false}
                                       create={this.props.create}
                                       episode={child}
                                       idTrip={this.state.idTrip}
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
