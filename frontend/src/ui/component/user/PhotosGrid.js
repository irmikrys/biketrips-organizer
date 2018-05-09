import React, {Component} from 'react';

class PhotosGrid extends Component {

  render() {
    return (
      <div className='photos-container'>
        {
          this.props.photos.length > 0 &&
          <div className='photos-grid'>
            {
              Object.values(this.props.photos)
                .map((photo, key) => {
                  console.log(photo);
                  return <img key={key}
                              src={`data:image/png;base64,${photo.photo}`}
                              className='photo-preview'
                  />
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
