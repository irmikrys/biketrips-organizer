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
                  <span className="glyphicon glyphicon-plus"/>
                </p>
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
