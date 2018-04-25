import React, {Component} from 'react';
import {dateFormatter} from "../utils";

class TripCard extends Component {

  handleClick = () => {
    window.location = '/trips/' + this.props.trip.idTrip;
  };

  render() {
    const {trip} = this.props;
    return (
      <div className="trip-card" onClick={this.handleClick}>
        <h3>{trip.name}</h3>
        <div className="trip-details">
          <div><b>Moderator: </b>{trip.moderator}</div>
          <div><b>Level: </b>
            {this.props.levels.filter(e => e.idLevel === trip.idLevel)[0].name}
          </div>
          <div><b>Points: </b>{trip.points}</div>
          <div><b>Start: </b>{dateFormatter(new Date(trip.startDate))}</div>
          <div><b>End: </b>{dateFormatter(new Date(trip.endDate))}</div>
          <label>Description:</label>
          <div>{trip.description}</div>
        </div>
      </div>
    );
  }
}

export default TripCard;
