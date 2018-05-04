import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchAlbumsByIdTrip} from "../../../reducers/albums/albums";
import {createAlbum} from "../../../reducers/albums/createAlbum";

class AlbumsPage extends Component {

  constructor(props) {
    super(props);
    props.fetchAlbums(this.props.params.idTrip);
    this.state = {
      newName: ""
    }
  }

  clearName = () => {
    this.setState({
      newName: ""
    })
  };

  handleInputChange = event => {
    let value = event.target.value;
    let inputName = event.target.name;
    this.setState({[inputName]: value});
  };

  addAlbum = (name, idTrip) => {
    const {create} = this.props;
    const albumInfo = {
      name,
      idTrip
    };
    create(idTrip, albumInfo);
  };

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
                .map((album, key) => (
                  <div className="album-container" key={key}>
                    <div className="album">
                      <p>
                        {album.name}
                      </p>
                    </div>
                  </div>
                ))
            }
            <div className="album-container">
              <div className="album">
                <p>
                  <span data-toggle="modal"
                        data-target="#myModal"
                        className="glyphicon glyphicon-plus"
                        onClick={this.clearName}
                  />
                </p>
              </div>
            </div>

            <div id="myModal" className="modal fade" role="dialog">
              <div className="modal-dialog modal-sm">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button"
                            className="close"
                            data-dismiss="modal"
                    >
                      &times;
                    </button>
                    <h4 className="modal-title">Pick a name for the album</h4>
                  </div>
                  <div className="modal-body">
                    <input name='newName'
                           placeholder="album name..."
                           value={this.state.newName}
                           onInput={this.handleInputChange}
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button"
                            className="btn btn-default"
                            data-dismiss="modal"
                            onClick={() => this.addAlbum(this.state.newName, this.props.params.idTrip)}
                    >
                      Add
                    </button>
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
  fetchAlbums: fetchAlbumsByIdTrip,
  create: createAlbum
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AlbumsPage);
