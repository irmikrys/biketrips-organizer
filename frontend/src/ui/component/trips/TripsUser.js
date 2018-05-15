import React, {Component} from "react";
import TripsUserGrid from "./TripsUserGrid";
import FilterBar from "./FilterBar";

class TripsUser extends Component {

  constructor(props) {
    super(props);
    props.fetchLevels();
    props.fetchStatuses();

    if (_.isEmpty(props.filterCriteria))
      props.fetchTrips();

    this.state = {
      filterCriteria: props.filterCriteria
    };
  }

  handleFilterBarChange = filterCriteria => {
    this.props.setFilters(filterCriteria);
    this.props.fetchTrips(filterCriteria);
  };

  componentWillReceiveProps(props) {
    if (props.filterCriteria !== this.state.filterCriteria) {
      props.fetchTrips(props.filterCriteria);
      this.setState({filterCriteria: props.filterCriteria});
    }
  }

  render() {
    return (
      <div className="main-color-none">
        <FilterBar className='search-bar-container margin-bottom-50'
                   levels={this.props.levels}
                   statuses={Object.values(this.props.statuses)
                     .filter(status => {
                       return status.idStatus === 1 || status.idStatus === 2
                     })
                   }
                   filterCriteria={this.state.filterCriteria}
                   onChange={this.handleFilterBarChange.bind(this)}
        />
        {
          !this.props.updating && <div className="user-trip-grid">
            <TripsUserGrid trips={this.props.trips}
                           username={this.props.username}
                           fetchTrip={this.props.fetchTrip}
                           levels={this.props.levels}
                           statuses={this.props.statuses}
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
