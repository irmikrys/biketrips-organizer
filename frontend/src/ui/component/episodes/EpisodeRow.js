import React, {Component} from "react";
import {datetimeFormatter} from "../utils";
import Geosuggest from "react-geosuggest";
import axios from "axios";
import moment from 'moment';
import InputMoment from 'input-moment';

class EpisodeRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentEpisode: {},
      location: {},
      moment: moment(),
    }
  }

  componentDidMount() {
    console.log(this.props);
    const {idTrip, idEpisode} = this.props.episode;
    if (idTrip !== undefined && idTrip !== null && idEpisode !== undefined && idEpisode !== null) {
      axios.get(`/api/trips/${idTrip}/episodes/${idEpisode}`)
        .then((response) => {
          this.setState({
            currentEpisode: response.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleChange = moment => {
    this.setState({moment});
  };

  handleSave = () => {
    console.log('saved', this.state.moment.format('llll'));
  };

  render() {
    const {episode} = this.props;
    const {currentEpisode} = this.state;
    let episodeData = currentEpisode == null ? episode : currentEpisode;
    console.log(this.state);
    return (
      <form>
        <div className="episodeRow">
          <div className="time-picker">
            <div className="upper">
              <input id="time-input"
                     placeholder="time"
                     value={episodeData.time == null ?
                       datetimeFormatter(new Date(this.state.moment)) :
                       datetimeFormatter(new Date(episode.time))
                     }
                     disabled={this.props.fieldsDisabled}
                     required
              />
            </div>
            <div className="lower">
              <InputMoment
                moment={this.state.moment}
                onChange={this.handleChange}
                onSave={this.handleSave}
                minStep={15}
                prevMonthIcon="glyphicon glyphicon-chevron-left"
                nextMonthIcon="glyphicon glyphicon-chevron-right"
              />
            </div>
          </div>
          <div>
            <Geosuggest placeholder="location"
                        initialValue={episodeData.locationDTO == null ?
                          '' : episodeData.locationDTO.description}
                        onSuggestSelect={this.handleLocationSelect}
                        disabled={this.props.fieldsDisabled}
            />
          </div>
          <div id="description">
            <input placeholder="short description"
                   value={episodeData.description}
                   disabled={this.props.fieldsDisabled}
                   required
            />
          </div>
          <button type="button" disabled={!this.props.tripSelected}>
            <span className={this.props.glyphicon}/>
          </button>
        </div>
      </form>
    )
  }

  handleLocationSelect = value => {
    const location = {
      description: value.label,
      latitude: value.location.lat,
      longitude: value.location.lng
    };
    this.setState({location: location})
  };

}

export default EpisodeRow;
