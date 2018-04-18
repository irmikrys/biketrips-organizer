import React, {Component} from 'react';
import {dateFormatter} from "../utils";

class TripTile extends Component {

  handleClick = () => {
    window.location = '/edit-trip/' + this.props.trip.idTrip;
  };

  render() {
    const {trip, levels, statuses, activities} = this.props;
    return (
      <div className="trip-tile" onClick={this.handleClick}>
        <h3>{trip.name}</h3>
        <div className="tile-content">
          <div className="column">
            <div>{trip.description}</div>
            <div>From: {dateFormatter(new Date(trip.startDate))}</div>
            <div>To: {dateFormatter(new Date(trip.endDate))}</div>
            <div>Level: {levels.filter(e => e.idLevel === trip.idLevel)[0].name}</div>
            <div>Points: {trip.points}</div>
            <div>Status: {statuses.filter(e => e.idStatus === trip.idStatus)[0].name}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default TripTile;
