import React, {Component} from 'react';

class UserProfile extends Component {

  render() {
    const {user} = this.props;
    return (
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
              </tr>
              <tr>
                <td id="label">
                  Points
                </td>
                <td id="label">
                  Trips
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div id="email">{user.email}</div>
        </div>
        <div className="column-flex">
          {
            Object.values(this.props.trips)
              .map((trip, key) => {
                return (
                  <div key={key}>{trip.name}</div>
            )})
          }
        </div>
      </div>
    );
  }

}

export default UserProfile;
