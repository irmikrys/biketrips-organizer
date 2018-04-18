import React, {Component} from 'react';
import {dateFormatter} from "../utils";

class TripView extends Component {

  initializeMapWithMarkers(lat, lng) {
    const {episodes} = this.props;
    let latitude = lat;
    let longitude = lng;
    if(episodes) {
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
    if(episodes) {
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
            <label className="margin-top-2">Description:</label>
            <div>{trip.description}</div>
            <label className="margin-top-2">Moderator:</label>
            <div>{trip.moderator}</div>
            <label className="margin-top-2">Start date:</label>
            <div>{dateFormatter(new Date(trip.startDate))}</div>
            <label className="margin-top-2">End date:</label>
            <div>{dateFormatter(new Date(trip.endDate))}</div>
            <label className="margin-top-2">Participants:</label>
            <div>number of participants</div>
          </div>
          <div className="column">
            <div id="map"/>
          </div>
        </div>
      </div>
    )
  }
}

export default TripView;
