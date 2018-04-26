import React, {Component} from "react";
import Geosuggest from "react-geosuggest";
import axios from "axios";
import {SingleDatePicker} from "react-dates";
import 'react-dates/initialize';
import {datetimeFormatter} from "../utils";

class EpisodeRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentEpisode: null,
      errorMessage: "",
      description: "",
      location: null,
      date: null,
      focused: false,
      submitted: this.props.submitted,
      deleted: false
    }
  }

  componentDidMount() {
    console.log(this.props);
    const {idTrip, idEpisode} = this.props.episode;
    if (idTrip !== undefined && idTrip !== null &&
      idEpisode !== undefined && idEpisode !== null) {
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

  handleLocationSelect = value => {
    const location = {
      description: value.label,
      latitude: value.location.lat,
      longitude: value.location.lng
    };
    this.setState({location: location})
  };

  handleInputChange = event => {
    event.preventDefault();
    let value = event.target.value;
    let inputName = event.target.name;
    this.setState({[inputName]: value});
  };

  handleDelete = event => {
    event.preventDefault();
    const {idEpisode, idTrip} = this.props.episode;
    if (this.state.submitted) {
      axios.delete(`/api/trips/${idTrip}/episodes/${idEpisode}`);
    }
    this.setState({
      deleted: true
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      errorMessage: ""
    });
    const {create} = this.props;
    const idEpisode = 1;
    const description = this.state.description;
    const idTrip = this.props.idTrip;
    const locationDTO = this.state.location;
    const time = this.state.date;
    const episodeInfo = {
      idEpisode,
      idTrip,
      time,
      locationDTO,
      description
    };
    console.log(episodeInfo);
    if (locationDTO === null) {
      this.setState({
        errorMessage: "Invalid location!"
      });
    }
    if (time === null) {
      this.setState({
        errorMessage: "Invalid time!"
      });
    }
    create(idTrip, episodeInfo);
    this.setState({
      submitted: true
    });
  };

  render() {
    const {episode} = this.props;
    const {currentEpisode} = this.state;
    const {deleted, submitted} = this.state;
    const {errorMessage} = this.state;
    let episodeData = currentEpisode === null ? episode : currentEpisode;
    const errorPanel = errorMessage !== "" && submitted ?
      <p className="error-message">{errorMessage}</p> : null;
    let disabled = submitted && errorPanel === null;
    return (
      <div>
        {deleted && null}
        {!deleted &&
        <form onSubmit={this.handleSubmit}>
          <div className="episode-row">
            <div>
              {
                submitted && errorPanel === null &&
                <input name="time"
                       value={datetimeFormatter(new Date(episode.time))}
                       disabled={true}
                />
              }
              {
                (!submitted || (submitted && errorPanel !== null)) &&
                <SingleDatePicker date={this.state.date}
                                  onDateChange={date => this.setState({date})}
                                  focused={this.state.focused}
                                  onFocusChange={({focused}) => this.setState({focused})}
                                  noBorder={true}
                                  small={true}
                                  placeholder="date"
                                  hideKeyboardShortcutsPanel={true}
                                  required
                />
              }
            </div>
            <div>
              {
                (!submitted || (submitted && errorPanel !== null)) &&
                <div className="temporary-date-input">
                  <span className="glyphicon glyphicon-time"/>
                </div>
              }
            </div>
            <div>
              <Geosuggest placeholder="location"
                          initialValue={episodeData.locationDTO == null ?
                            '' : episodeData.locationDTO.description}
                          onSuggestSelect={this.handleLocationSelect}
                          disabled={disabled}
                          required
              />
            </div>
            <div id="description">
              <input placeholder="short description"
                     name="description"
                     value={this.props.fieldsDisabled ?
                       episodeData.description :
                       this.state.description
                     }
                     disabled={disabled}
                     onInput={this.handleInputChange}
                     required
              />
            </div>
            {
              (!submitted || (submitted && errorPanel !== null)) &&
              <button type="submit" disabled={!this.props.tripSelected}>
                <span className="glyphicon glyphicon-floppy-disk"/>
              </button>
            }
            <button
              onClick={this.handleDelete}
              disabled={!this.props.tripSelected}
              style={{background: "red"}}
            >
              <span className="glyphicon glyphicon-trash"/>
            </button>
          </div>
          {errorPanel}
        </form>
        }
      </div>
    )
  }

}

export default EpisodeRow;
