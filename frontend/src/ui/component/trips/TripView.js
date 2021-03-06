import React, {Component} from 'react';
import {dateFormatter, datetimeFormatter} from "../utils";
import Select from "react-select";

class TripView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idActivity: 0,
    };
  }

  initializeMapWithMarkers(lat, lng) {
    const {episodes} = this.props;
    let latitude = lat;
    let longitude = lng;
    if (episodes.length !== 0) {
      latitude = episodes[0].locationDTO.latitude;
      longitude = episodes[0].locationDTO.longitude;
    }
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {
        lat: latitude,
        lng: longitude
      },
      zoom: 12,
      mapTypeId: 'roadmap',
    });
    if (episodes.length !== 0) {
      const markers = [];
      episodes.map((episode, key) => {
        const marker = new window.google.maps.Marker({
          map: map,
          position: {
            lat: episode.locationDTO.latitude,
            lng: episode.locationDTO.longitude
          },
          zIndex: 1
        });
        const content =
          `<p>${datetimeFormatter(new Date(episode.time))}</p>` +
          `<p>${episode.description}</p>` +
          `<p class="map-popup-paragraph" id=episode${episode.idLocation}/>`;
        const infoWindow = new window.google.maps.InfoWindow({content: content});
        markers.push(marker);
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    }
  }

  componentDidMount() {
    this.initializeMapWithMarkers(50.0645191000000000, 19.923639699999967);
    const participant = Object.values(this.props.participants)
      .filter(user => {return user.username === this.props.username});
    this.setState({isUserParticipant: participant.length === 1});
  }

  handleActivityChange = value => {
    const {idTrip, username, updateParticipant} = this.props;
    const participantInfo = {
      username: username,
      idTrip: idTrip,
      idActivity: value
    };
    updateParticipant(idTrip, username, participantInfo, this.props.fetchParticipants);
    this.setState({idActivity: value});
  };

  render() {
    const {levels, statuses, trip} = this.props;
    return (
      <div className="left-content">
        <div className="paragraph-title">
          <h3>{trip.name}</h3>
        </div>
        <div className="trip-view">
          <div className="column">
            <div className="three-column">
              <label>Status:</label>
              {
                Object.values(statuses)
                  .filter(status => {
                    return status.idStatus === trip.idStatus
                  })
                  .map((status, key) => {
                    return <div key={key}>{status.name}</div>
                  })
              }
            </div>
            <div className="three-column">
              <label>Points:</label>
              <div>{trip.points}</div>
            </div>
            <div className="three-column">
              <label>Level:</label>
              {
                Object.values(levels)
                  .filter(level => {
                    return level.idLevel === trip.idLevel
                  })
                  .map((level, key) => {
                    return <div key={key}>{level.name}</div>
                  })
              }
            </div>
            <div className="column">
              <label className="margin-top-2">Description:</label>
              <div>{trip.description}</div>
              <label className="margin-top-2">Moderator:</label>
              <div>{trip.moderator}</div>
              <label className="margin-top-2">Start date:</label>
              <div>{dateFormatter(new Date(trip.startDate))}</div>
              <label className="margin-top-2">End date:</label>
              <div>{dateFormatter(new Date(trip.endDate))}</div>
              <label className="margin-top-2">Watching user:</label>
              <div>{this.props.username}</div>
            </div>
            <div className="column">
              <label className="margin-top-2">Participants:</label>
              {
                Object.values(this.props.participants)
                  .map((participant, key) => {
                    return <div key={key}>{participant.username}</div>
                  })
              }
            </div>
          </div>
          <div className="column">
            <div id="map"/>
            <div className="trip-actions">
              {
                this.state.isUserParticipant &&
                this.props.trip.idStatus !== 4 &&
                <div className="margin-top-2">
                  <div className="column margin-top-1 left-content">
                    {
                      this.props.trip.idStatus === 3 && <b>Status:</b>
                    }
                    {
                      this.props.trip.idStatus !== 3 && <b>Change your status:</b>
                    }
                  </div>
                  <div className="column">
                    {
                      Object.values(this.props.participants)
                        .filter(participant => {
                            return participant.username === this.props.username
                          }
                        )
                        .map((participant, key) => {
                            return (
                              <div key={key}>
                                {
                                  participant.idActivity === 4 &&
                                  <input value="confirmed"
                                         disabled={true}
                                  />
                                }
                                {
                                  participant.idActivity !== 4 &&
                                  <Select simpleValue
                                          key={key}
                                          placeholder="your status..."
                                          clearable={false}
                                          value={
                                            this.state.idActivity === 0 ?
                                              participant.idActivity :
                                              this.state.idActivity
                                          }
                                          onChange={this.handleActivityChange}
                                          options={this.props.activities.map(item => {
                                            return {value: item.idActivity, label: item.name}
                                          })}
                                          disabled={this.props.trip.idStatus === 3}
                                          required
                                  />
                                }
                              </div>
                            );
                          }
                        )
                    }
                  </div>
                </div>
              }
              {
                (!this.state.isUserParticipant || this.props.trip.idStatus === 4) && null
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TripView;
