import React, {Component} from 'react';

class UserProfile extends Component {

  render() {
    const {user} = this.props;
    return (
      <div className="profile">
        <div className="column">
          <div>{user.username}</div>
          <div>{user.firstName}</div>
          <div>{user.lastName}</div>
          <div>{user.email}</div>
          <div>{user.points}</div>
        </div>
      </div>
    );
  }

}

export default UserProfile;
