import React, {Component} from 'react';
import {dateFormatter} from "../utils";

class TripTile extends Component {

  handleClick = () => {
    window.location = '/edit-trip/' + this.props.trip.idTrip;
  };

  render() {
    const {trip} = this.props;
    return (
      <div className="trip-tile" onClick={this.handleClick}>
        <h3>{trip.name}</h3>
        <div className="tile-content">
          <div>{trip.description}</div>
          <div>From: {dateFormatter(new Date(trip.startDate))}</div>
          <div>To: {dateFormatter(new Date(trip.endDate))}</div>
          <div>Level: {trip.idLevel}</div>
          <div>Points: {trip.points}</div>
        </div>
      </div>
    )
  }
}

export default TripTile;
