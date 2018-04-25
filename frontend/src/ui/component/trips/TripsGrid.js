import React, {Component} from 'react';
import TripTile from "./TripTile";

class TripsGrid extends Component {

  render() {
    return (
      <div className="tile-wrapper">
        {
          Object.values(this.props.trips)
            .map((trip, key) => {
              return <TripTile key={key}
                               trip={trip}
                               levels={this.props.levels}
                               statuses={this.props.statuses}
                               activities={this.props.activities}
                               fetchTrip={this.props.fetchTrip}
                               editTrip={this.props.editTrip}
              />
            })
        }
      </div>
    )
  }
}

export default TripsGrid;
