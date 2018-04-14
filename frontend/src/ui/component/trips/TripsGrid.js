import React, {Component} from 'react';
import TripTile from "./TripTile";

class TripsGrid extends Component {

  render() {
    return(
      <div className="tile-wrapper">
        {
          Object.values(this.props.trips)
            .map(trip => {
              return <TripTile trip={trip}
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
