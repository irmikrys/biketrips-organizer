import React, {Component} from 'react';
import Dropzone from "react-dropzone";
import {EMAIL, FIRST_NAME, getFormField, LAST_NAME, LOCATION, PASSWORD, USERNAME,} from "../../constants/constants";

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

  handleInputChange = event => {
    let value = event.target.value;
    let inputName = event.target.name;
    this.setState({[inputName]: value});
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
                       required
                />
                <button>Save</button>
              </div>
            </div>
          </div>
        </div>
        <div id="cover"/>
      </div>
    )
  };

}

export default EditProfileModal;
