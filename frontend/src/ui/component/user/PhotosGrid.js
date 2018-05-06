import React, {Component} from 'react';

class PhotosGrid extends Component {

  render() {
    return (
      <div>
        {
          this.props.photos.length > 0 &&
          <div className='main'>
            {
              Object.values(this.props.photos)
                .map((photo, key) => {
                  return <div key={key}>{photo.idPhoto}</div>
                })
            }
          </div>
        }
        {
          this.props.photos.length === 0 && null
        }
      </div>
    );
  }

}

export default PhotosGrid;
