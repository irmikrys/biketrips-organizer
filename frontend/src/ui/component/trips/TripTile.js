import React, {Component} from 'react';
import {dateFormatter} from "../utils";
import axios from 'axios';

class TripTile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      participants: [],
    };
  }

  fetchParticipants = () => {
    const {idTrip} = this.props.trip;
    axios.get(`api/trips/${idTrip}/participants`)
      .then((response) => {
        this.setState({
          participants: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDropdownClick = event => {
    event.preventDefault();
    this.fetchParticipants();
  };

  handleClick = () => {
    window.location = '/edit-trip/' + this.props.trip.idTrip;
  };

  confirm = participant => {
    const {username, idTrip} = participant;
    const idActivity = 4;
    const {points} = this.props.trip;
    const participantDTO = {
      username,
      idTrip,
      idActivity
    };
    axios.put(`/api/trips/${idTrip}/participants/${username}`, participantDTO);
    axios.put(`/api/users/${username}/points?points=${points}`, null);
  };

  render() {
    const {trip, levels, statuses} = this.props;
    return (
      <div className="trip-tile">
        <h3 className="title">{trip.name}
          <span className='glyphicon glyphicon-pencil'
                onClick={this.handleClick}/>
        </h3>
        <div className="tile-content">
          <div className="column">
            <div>{trip.description}</div>
            <div>From: {dateFormatter(new Date(trip.startDate))}</div>
            <div>To: {dateFormatter(new Date(trip.endDate))}</div>
            <div>Level: {levels.filter(e => e.idLevel === trip.idLevel)[0].name}</div>
            <div>Points: {trip.points}</div>
            <div>Status: {statuses.filter(e => e.idStatus === trip.idStatus)[0].name}</div>
          </div>
          <div className="column">
            <div className="dropdown">
              <button className="btn dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      onClick={this.handleDropdownClick}
              > Participants
                <span className="caret"/></button>
              <ul className="dropdown-menu">
                {
                  this.state.participants.length !== 0 &&
                  <div>
                    <li className="dropdown-header">Invited</li>
                    {
                      Object.values(this.state.participants)
                        .filter(participant => {
                          return participant.idActivity === 1
                        })
                        .map((participant, key) => {
                          return <li key={key}
                                     className="margin">
                            {participant.username}
                          </li>
                        })
                    }
                    <li className="divider"/>
                    <li className="dropdown-header">Accepted</li>
                    {
                      Object.values(this.state.participants)
                        .filter(participant => {
                          return participant.idActivity === 2
                        })
                        .map((participant, key) => {
                          return (
                            <div key={key}>
                              <li className="margin">
                                {participant.username}
                                {
                                  this.props.trip.idStatus === 3 &&
                                  <span className='glyphicon glyphicon-ok'
                                        onClick={() => this.confirm(participant)}
                                  />
                                }
                              </li>
                            </div>
                          );
                        })
                    }
                    <li className="divider"/>
                    <li className="dropdown-header">Denied</li>
                    {
                      Object.values(this.state.participants)
                        .filter(participant => {
                          return participant.idActivity === 3
                        })
                        .map((participant, key) => {
                          return <li key={key}
                                     className="margin">
                            {participant.username}
                          </li>
                        })
                    }
                    <li className="divider"/>
                    <li className="dropdown-header">Confirmed</li>
                    {
                      Object.values(this.state.participants)
                        .filter(participant => {
                          return participant.idActivity === 4
                        })
                        .map((participant, key) => {
                          return <li key={key}
                                     className="margin">
                            {participant.username}
                          </li>
                        })
                    }
                  </div>
                }
                {
                  this.state.participants.length === 0 &&
                  <li className="margin">No participants...</li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TripTile;
