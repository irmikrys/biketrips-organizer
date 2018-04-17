import React, {Component} from 'react';
import {dateFormatter} from "../utils";

class TripView extends Component {

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
        </div>
      </div>
    )
  }
}

export default TripView;
