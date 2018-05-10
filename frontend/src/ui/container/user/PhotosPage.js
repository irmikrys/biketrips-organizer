import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchPhotosByIdAlbum} from "../../../reducers/photos/photos";
import {addPhotoToAlbum} from "../../../reducers/photos/addPhoto";
import Dropzone from 'react-dropzone';
import {DROPZONE_ACTIVE, DROPZONE_INACTIVE} from "../../constants/constants";
import PhotosGrid from "../../component/user/PhotosGrid";
import {fetchAlbumByIdTripAndIdAlbum} from "../../../reducers/albums/album";

class PhotosPage extends Component {

  constructor(props) {
    super(props);
    props.fetchPhotos(this.props.params.idTrip, this.props.params.idAlbum);
    props.fetchAlbum(this.props.params.idTrip, this.props.params.idAlbum);
    this.state = {
      accepted: [],
      rejected: [],
      addPhotosActive: false,
      photos: []
    }
  }

  componentDidMount() {
    this.setState({photos: this.props.photos});
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
      rejected,
      photos: this.state.photos.concat(accepted)
    });
    accepted.forEach(file => {
      const {idTrip, idAlbum} = this.props.params;
      const {addPhoto} = this.props;
      let data = new FormData();
      data.append('file', file);
      addPhoto(idTrip, idAlbum, data);
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
                <p>Click to select files to upload.</p>
                <p>Only *.jpeg and *.png images will be accepted</p>
              </Dropzone>
            </div>
            <div className='aside'>
              <h2>Accepted files</h2>
              <ul>
                {
                  this.state.photos
                    .map((f, key) =>
                      <li key={key}>{f.name} - {f.size} bytes</li>
                    )
                }
              </ul>
              <h2>Rejected files</h2>
              <ul>
                {
                  this.state.rejected
                    .map((f, key) =>
                      <li key={key}>{f.name} - {f.size} bytes</li>
                    )
                }
              </ul>
            </div>
          </div>
        }
        {
          (this.props.updating || this.props.albumUpdating) && <div className='loader'/>
        }
        {
          !this.props.updating && !this.props.albumUpdating &&
          <PhotosGrid photos={this.props.photos}
                      album={this.props.album}
          />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    photos: state.photos.photos,
    updating: state.photos.updating,
    album: state.album.album,
    albumUpdating: state.album.updating
  };
}

const mapActionsToProps = {
  fetchPhotos: fetchPhotosByIdAlbum,
  addPhoto: addPhotoToAlbum,
  fetchAlbum: fetchAlbumByIdTripAndIdAlbum
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PhotosPage);
