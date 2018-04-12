import React, {Component} from 'react';

class TripTile extends Component {

  render() {
    const {trip} = this.props;
    return(
      <div className="trip-tile">
        <h3>{trip.name}</h3>
      </div>
    )
  }
}

export default TripTile;
