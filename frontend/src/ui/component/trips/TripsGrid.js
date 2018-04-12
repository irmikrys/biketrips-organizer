import React, {Component} from 'react';
import TripTile from "./TripTile";

class TripsGrid extends Component {

  render() {
    return(
      <div>
        <h2>Hello, these are your Trips!</h2>
        {
          Object.values(this.props.trips)
            .map(trip => {
              return <TripTile trip={trip}
              />
            })
        }
      </div>
    )
  }
}

export default TripsGrid;