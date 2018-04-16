import React, {Component} from "react";
import TripsUserGrid from "./TripsUserGrid";

class TripsUser extends Component {

  constructor(props) {
    super(props);
    props.fetchLevels();
    props.fetchAllTrips();
  }

  render() {
    console.log(this.props.trips);
    return (
      <div>
        <h2 className="main">Trips</h2>
        {
          !this.props.updating && <TripsUserGrid trips={this.props.trips}
                                                 username={this.props.username}
                                                 fetchTrip={this.props.fetchTrip}
                                                 levels={this.props.levels}
          />
        }

        {
          this.props.updating && <div className="loader margin-top"/>
        }
      </div>
    )
  }

}

export default TripsUser;
