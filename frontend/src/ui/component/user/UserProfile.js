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
          <div><b>username: </b>{user.username}</div>
          <div><b>first name: </b>{user.firstName}</div>
          <div><b>last name: </b>{user.lastName}</div>
          <div><b>email: </b>{user.email}</div>
          <div><b>points: </b>{user.points}</div>
        </div>
      </div>
    );
  }

}

export default UserProfile;
