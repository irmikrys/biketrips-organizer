import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchPhotosByIdAlbum} from "../../../reducers/photos/photos";
import {addPhotoToAlbum} from "../../../reducers/photos/addPhoto";
import Dropzone from 'react-dropzone';
import {DROPZONE_ACTIVE, DROPZONE_INACTIVE} from "../../constants/constants";

class PhotosPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accepted: [],
      rejected: [],
      addPhotosActive: false
    }
  }

  goToAlbums = () => {
    window.location = '/trips/' + this.props.params.idTrip + '/albums'
  };

  changeDropzoneVisibility = () => {
    this.setState({
      addPhotosActive: !this.state.addPhotosActive
    });
  };

  onDrop = (accepted, rejected) => {
    this.setState({
      accepted,
      rejected
    });
  };

  render() {
    const toggleText = this.state.addPhotosActive ? DROPZONE_ACTIVE : DROPZONE_INACTIVE;
    return (
      <div className='photos-page'>
        <button className='btn btn-default'
                onClick={this.goToAlbums}
        >
          Go back to trip albums
        </button>
        <button className='btn btn-default'
                onClick={this.changeDropzoneVisibility}
        >
          {toggleText}
        </button>
        {
          this.state.addPhotosActive &&
          <div className='photos-drop'>
            <div className='drop'>
              <Dropzone
                className='dropzone'
                accept="image/jpeg, image/png"
                onDrop={this.onDrop.bind(this)}
              >
                <p>Try dropping some files here, or click to select files to upload.</p>
                <p>Only *.jpeg and *.png images will be accepted</p>
              </Dropzone>
            </div>
            <div className='aside'>
              <h2>Accepted files</h2>
              <ul>
                {
                  this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                }
              </ul>
              <h2>Rejected files</h2>
              <ul>
                {
                  this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                }
              </ul>
            </div>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    photos: state.photos.photos,
    updating: state.photos.updating
  };
}

const mapActionsToProps = {
  fetchPhotos: fetchPhotosByIdAlbum,
  addPhoto: addPhotoToAlbum
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PhotosPage);
