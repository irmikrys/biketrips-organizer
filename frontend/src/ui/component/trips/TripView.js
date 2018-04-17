import React, {Component} from 'react';

class TripView extends Component {

  render() {
    const {levels, trip} = this.props;
    return (
      <div className="paragraph-title">
        <h3>{trip.name}</h3>
      </div>
    )
  }
}

export default TripView;
