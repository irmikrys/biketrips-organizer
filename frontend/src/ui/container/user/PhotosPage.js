import React, {Component} from 'react';

class PhotosPage extends Component {
  render() {
    return (
      <div className='margin-top'>
        Photos for album id {this.props.params.idAlbum}
      </div>
    );
  }
}

export default PhotosPage;
