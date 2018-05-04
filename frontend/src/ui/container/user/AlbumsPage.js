import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchAlbumsByIdTrip} from "../../../reducers/albums";

class AlbumsPage extends Component {

  constructor(props) {
    super(props);
    props.fetchAlbums(this.props.params.idTrip);
  }

  render() {
    console.log(this.props);
    return (
      <div className='margin-top'>
        {
          this.props.updating && <div className='loader'/>
        }
        {
          !this.props.updating &&
          <div className='albums-grid'>
            {
              Object.values(this.props.albums)
                .map((item, key) => (
                  <div className="album-container" key={key}>
                    <div className="album">
                      <p>
                        {item.name}
                      </p>
                    </div>
                  </div>
                ))
            }
            <div className="album-container">
              <div className="album">
                <p>
                  <span data-toggle="modal" data-target="#myModal" className="glyphicon glyphicon-plus"/>
                </p>
              </div>
            </div>

            <div id="myModal" className="modal fade" role="dialog">
              <div className="modal-dialog modal-sm">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Pick a name for the album</h4>
                  </div>
                  <div className="modal-body">
                    <input placeholder="album name..."/>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    albums: state.albums.albums,
    updating: state.albums.updating
  };
}

const mapActionsToProps = {
  fetchAlbums: fetchAlbumsByIdTrip
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AlbumsPage);
