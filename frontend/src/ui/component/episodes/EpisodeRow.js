import React, {Component} from "react";
import Geosuggest from "react-geosuggest";
import axios from "axios";
import {SingleDatePicker} from "react-dates";
import 'react-dates/initialize';

class EpisodeRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentEpisode: {},
      description: "",
      location: {},
      date: null,
      focused: false,
      submitted: false,
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
    if(this.state.submitted) {
      axios.delete(`/api/trips/${idTrip}/episodes/${idEpisode}`);
    }
    this.setState({
      deleted: true
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    const {create} = this.props;
    const description = this.state.description;
    const idTrip = this.props.idTrip;
    const location = this.state.location;
    const date = this.state.date;
    const episodeInfo = {
      idTrip,
      date,
      location,
      description
    };
    create(idTrip, episodeInfo);
    this.setState({
      submitted: true
    });
  };

  render() {
    const {episode} = this.props;
    const {currentEpisode} = this.state;
    const {deleted, submitted} = this.state;
    let episodeData = currentEpisode == null ? episode : currentEpisode;
    console.log(this.state);
    return (
      <div>
        {deleted && null}
        {!deleted &&
        <form onSubmit={this.handleSubmit}>
          <div className="episode-row">
            <div>
              <SingleDatePicker date={this.state.date}
                                onDateChange={date => this.setState({date})}
                                focused={this.state.focused}
                                onFocusChange={({focused}) => this.setState({focused})}
                                noBorder={true}
                                small={true}
                                hideKeyboardShortcutsPanel={true}
                                required
              />
            </div>
            <div>
              <Geosuggest placeholder="location"
                          initialValue={episodeData.locationDTO == null ?
                            '' : episodeData.locationDTO.description}
                          onSuggestSelect={this.handleLocationSelect}
                          disabled={this.props.fieldsDisabled}
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
                     disabled={this.props.fieldsDisabled}
                     onInput={this.handleInputChange}
                     required
              />
            </div>
            <button type="submit" disabled={!this.props.tripSelected}>
              <span className={this.props.glyphicon}/>
            </button>
            <button
              onClick={this.handleDelete}
              disabled={!this.props.tripSelected}
              style={{background: "red"}}
            >
              <span className="glyphicon glyphicon-trash"/>
            </button>
          </div>
        </form>
        }
      </div>
    )
  }

}

export default EpisodeRow;
