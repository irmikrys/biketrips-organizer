import React, {Component} from "react";
import TripsUserGrid from "./TripsUserGrid";

class TripsUser extends Component {

  constructor(props) {
    super(props);
    props.fetchLevels();
    props.fetchActiveTrips();
  }

  render() {
    return (
      <div className="main-color-none">
        {
          !this.props.updating && <div className="user-trip-grid">
            <TripsUserGrid trips={this.props.trips}
                           username={this.props.username}
                           fetchTrip={this.props.fetchTrip}
                           levels={this.props.levels}
            />
          </div>
        }

        {
          this.props.updating && <div className="loader margin-top"/>
        }
      </div>
    )
  }

}

export default TripsUser;
