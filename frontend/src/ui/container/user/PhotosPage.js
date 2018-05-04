import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchPhotosByIdAlbum} from "../../../reducers/photos/photos";
import {addPhotoToAlbum} from "../../../reducers/photos/addPhoto";

class PhotosPage extends Component {
  render() {
    return (
      <div className='margin-top'>
        <button className='btn btn-default'>
          Add photo to album {this.props.params.idAlbum}
        </button>
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
