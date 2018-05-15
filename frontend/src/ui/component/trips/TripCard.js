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
          {
            Object.values(this.props.levels)
              .filter(level => {
                return level.idLevel === trip.idLevel
              })
              .map((level, key) => {
                return <div key={key}><b>Level: </b>{level.name}</div>
              })
          }
          {
            Object.values(this.props.statuses)
              .filter(status => {
                return status.idStatus === trip.idStatus
              })
              .map((status, key) => {
                return <div key={key}><b>Status: </b>{status.name}</div>
              })
          }
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
