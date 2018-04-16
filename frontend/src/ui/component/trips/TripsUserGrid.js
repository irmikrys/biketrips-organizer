import React, {Component} from 'react';
import TripCard from "./TripCard";

class TripsUserGrid extends Component {

  render() {
    return (
      <div className="card-wrapper">
        {
          Object.values(this.props.trips)
            .map(trip => {
              return <TripCard trip={trip}
                               levels={this.props.levels}/>
            })
        }
      </div>
    );
  }
}

export default TripsUserGrid;
