import React, {Component} from 'react';
import TripCard from "./TripCard";

class TripsUserGrid extends Component {

  render() {
    return (
      <div className="card-wrapper">
        {
          this.props.trips.length === 0 &&
          <h2 className='main-color-none-white'>No trips found...</h2>
        }
        {
          Object.values(this.props.trips)
            .map((trip, key) => {
              return <TripCard key={key}
                               trip={trip}
                               levels={this.props.levels}
                               statuses={this.props.statuses}
              />
            })
        }
      </div>
    );
  }
}

export default TripsUserGrid;
