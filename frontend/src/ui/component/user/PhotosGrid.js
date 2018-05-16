import React, {Component} from 'react';

class PhotosGrid extends Component {

  getClassname = key => {
    return key === 0 ? 'item active' : 'item';
  };

  render() {
    return (
      <div className='photos-container'>
        {
          this.props.photos.length === 0 && null
        }
        {
          this.props.photos.length > 0 &&
          <div className='photos-grid'>
            {
              Object.values(this.props.photos)
                .map((photo, key) => {
                  return (
                    <div key={key}
                         data-toggle="modal"
                         data-target="#galleryModal"
                         className='photo-container'
                    >
                      <a href="#albumGallery" data-slide-to={key}>
                        <img src={`data:image/png;base64,${photo.photo}`}
                             className='photo-preview img-thumbnail'
                        />
                      </a>
                    </div>
                  )
                })
            }
          </div>
        }

        <div className="modal fade" id="galleryModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <div className="pull-left">{this.props.album.name} gallery</div>
                <button type="button" className="close" data-dismiss="modal" title="Close">
                  <span className="glyphicon glyphicon-remove"/>
                </button>
              </div>
              <div className="modal-body">

                <div id="albumGallery" className="carousel slide" data-interval="false">
                  <div className="carousel-inner">

                    {
                      Object.values(this.props.photos)
                        .map((photo, key) => {
                          return (
                            <div key={key} className={this.getClassname(key)}>
                              <img src={`data:image/png;base64,${photo.photo}`}
                                   className="photo-big"
                              />
                              <div className="carousel-caption">
                                <p/>
                              </div>
                            </div>
                          )
                        })
                    }

                  </div>
                  <a className="left carousel-control"
                     href="#albumGallery"
                     role="button"
                     data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left"/>
                  </a>
                  <a className="right carousel-control"
                     href="#albumGallery"
                     role="button"
                     data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right"/>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default PhotosGrid;
