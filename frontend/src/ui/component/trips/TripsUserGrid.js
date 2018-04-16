import React, {Component} from 'react';
import TripCard from "./TripCard";

class TripsUserGrid extends Component {

  render() {
    return (
      <div className="user-trip-grid">
        <div className="container">
          <div>
            {
              Object.values(this.props.trips)
                .map(trip => {
                  return <TripCard trip={trip}/>
                })
            }
          </div>
        </div>
      </div>

    );
  }
}

export default TripsUserGrid;
