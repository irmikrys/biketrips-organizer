import React, {Component} from 'react';
import Dropzone from "react-dropzone";
import {EMAIL, FIRST_NAME, getFormField, LAST_NAME, PASSWORD, USERNAME} from "../../constants/constants";
import axios from 'axios';

class EditProfileModal extends Component {

  constructor(props) {
    super(props);
    const {user} = props;
    this.state = {
      [USERNAME]: user.username,
      [FIRST_NAME]: user.firstName,
      [LAST_NAME]: user.lastName,
      [EMAIL]: user.email,
      [PASSWORD]: ""
    };
  }

  componentDidMount(){
    const {photo} = this.props.user;
    if(photo) {
      const img = document.getElementById('avatar-edit');
      img.src = `data:image/png;base64,${photo}`;
    }
  }

  handleInputChange = event => {
    let value = event.target.value;
    let inputName = event.target.name;
    this.setState({[inputName]: value});
  };

  onDrop = files => {
    let data = new FormData();
    data.append('file', files[0]);
    axios.put(`/api/users/${this.props.user.username}/photo`, data)
      .then(result => {
        const img = document.getElementById('avatar-edit');
        img.src = files[0].preview;
      });
  };

  render() {
    return (
      <div>
        <div className="container edit-modal margin-top">
          <span onClick={this.props.closeModal}
                className="remove-icon glyphicon glyphicon-remove"
          />
          <h3>Edit Profile</h3>
          <div className="profile-view">
            <div className="column">
              <div className="drop-down-zone">
                <Dropzone multiple={false}
                          onDrop={this.onDrop.bind(this)}
                          className={'dropdown-content'}
                >
                  <img id="avatar-edit"
                       src="http://eoclimlab.eu/wp-content/uploads/2017/01/default.png"
                  />
                </Dropzone>
              </div>
            </div>
            <div className="column">
              <div className="edit-form">
                {
                  [FIRST_NAME, LAST_NAME, EMAIL].map(fieldKey => {
                    const field = getFormField(fieldKey);
                    return <input key={field.name}
                                  value={this.state[fieldKey]}
                                  type={field.type}
                                  placeholder={field.placeholder}
                                  name={field.name}
                                  pattern={field.pattern}
                                  onChange={this.handleInputChange}
                                  required
                    />
                  })
                }
                <input type="password"
                       placeholder="password"
                       name={PASSWORD}
                       pattern={getFormField(PASSWORD).pattern}
                       onChange={this.handleInputChange}
                />
                <button>Save</button>
              </div>
            </div>
          </div>
        </div>
        <div id="cover"
             onClick={this.props.closeModal}
        />
      </div>
    )
  };

}

export default EditProfileModal;
