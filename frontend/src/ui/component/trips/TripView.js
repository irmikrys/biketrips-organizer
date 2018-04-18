import React, {Component} from 'react';
import {dateFormatter} from "../utils";
import Select from "react-select";

class TripView extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    const {participants} = this.props;
    this.state = {
      isUserParticipant: participants.filter(
        item => item.username === props.username
      ).length === 1,
      idActivity: 0,
    };
  }

  initializeMapWithMarkers(lat, lng) {
    const {episodes} = this.props;
    let latitude = lat;
    let longitude = lng;
    if (episodes) {
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
    if (episodes) {
      const markers = [];
      episodes.map(episode => {
        const marker = new window.google.maps.Marker({
          map: map,
          position: {
            lat: episode.locationDTO.latitude,
            lng: episode.locationDTO.longitude
          },
          zIndex: 1
        });
        markers.push(marker);
      });
    }
  }

  componentDidMount() {
    this.initializeMapWithMarkers(50.0645191000000000, 19.923639699999967);
  }

  handleActivityChange = value => {
    this.setState({idActivity: value})
  };

  render() {
    console.log(this.props);
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
              <div>{statuses.filter(e => e.idStatus === trip.idStatus)[0].name}</div>
            </div>
            <div className="three-column">
              <label>Points:</label>
              <div>{trip.points}</div>
            </div>
            <div className="three-column">
              <label>Level:</label>
              <div>{levels.filter(e => e.idLevel === trip.idLevel)[0].name}</div>
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
                <div className="margin-top-2">
                  <div className="column margin-top-1 left-content">
                    <b>Change your status:</b>
                  </div>
                  <div className="column">
                    {
                      Object.values(this.props.participants)
                        .filter(participant => {
                            return participant.username === this.props.username
                          }
                        )
                        .map(participant => {
                            return <Select simpleValue
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
                                           required
                            />
                          }
                        )
                    }
                  </div>
                </div>
              }
              {
                !this.state.isUserParticipant &&
                <button type="button">
                  <span className='glyphicon glyphicon-ok'/>
                  You are not participant!
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TripView;
