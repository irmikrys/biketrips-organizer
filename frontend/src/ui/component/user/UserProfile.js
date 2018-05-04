import React, {Component} from 'react';

class UserProfile extends Component {

  seeTrip = idTrip => {
    window.location = '/trips/' + idTrip;
  };

  seeAlbums = idTrip => {
    window.location = '/trips/' + idTrip + '/albums';
  };

  render() {
    const {user} = this.props;
    return (
      <div className="main">
        <div className="profile">
          <div className="column-fixed left-content">
            <div className="avatar-container">
              <img id="avatar"
                   src="http://eoclimlab.eu/wp-content/uploads/2017/01/default.png"
              />
            </div>
            <div id="name"><b>{user.firstName}</b></div>
            <div id="name"><b>{user.lastName}</b></div>
            <div id="username">@{user.username}</div>
            <div id="role">{user.role}</div>
            <div className="section">
              <table>
                <tbody>
                <tr>
                  <td id="info">
                    {user.points}
                  </td>
                  <td id="info">
                    {this.props.trips.length}
                  </td>
                  <td id="info">
                    {this.props.tripsArchive.length}
                  </td>
                  <td id="info">
                    {this.props.tripsActive.length}
                  </td>
                </tr>
                <tr>
                  <td id="label">
                    Points
                  </td>
                  <td id="label">
                    Trips
                  </td>
                  <td id="label">
                    Closed
                  </td>
                  <td id="label">
                    Active
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div id="email">{user.email}</div>
          </div>
          <div className="column-flex">
            <h3>Completed trips</h3>
            {
              Object.values(this.props.tripsArchive)
                .map((trip, key) => {
                  return (
                    <div className='trip'>
                      <div className='photos-column'>
                        <span className='glyphicon glyphicon-camera'
                        onClick={() => this.seeAlbums(trip.idTrip)}/>
                      </div>
                      <div key={key} className='trip-archive'>
                        <span className='link' onClick={() => this.seeTrip(trip.idTrip)}>{trip.name}</span>
                        <span className='info'>{' - ' + trip.description}</span>
                      </div>
                    </div>
                  )
                })
            }
          </div>
        </div>
      </div>
    );
  }

}

export default UserProfile;
