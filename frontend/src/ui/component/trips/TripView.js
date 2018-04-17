import React, {Component} from 'react';
import {dateFormatter} from "../utils";

class TripView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      map: null,
      markers: []
    };
  }

  initializeMap() {
    const lat = 50.0645191000000000;
    const lng = 19.923639699999967;
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {
        lat: lat,
        lng: lng
      },
      zoom: 12,
      mapTypeId: 'roadmap',
    });
    new window.google.maps.Marker({
      map: map,
      position: {
        lat: lat,
        lng: lng
      },
      zIndex: 1
    });
    this.setState({map});
  }

  initializeMarkers() {
    const {episodes} = this.props;
    console.log(episodes);
    if(episodes) {
      const markers = [];
      episodes.map(episode => {
        console.log("nowy epizod");
        const marker = new window.google.maps.Marker({
          map: this.state.map,
          position: {
            lat: episode.location.latitude,
            lng: episode.location.longitude
          },
          zIndex: 1
        });
        markers.push(marker);
      });
      this.setState({markers});
    }
  }

  componentDidMount() {
    this.initializeMap();
    this.initializeMarkers();
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    const {levels, statuses, trip} = this.props;
    console.log(statuses.filter(e => e.idStatus === trip.idStatus)[0].name);
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
