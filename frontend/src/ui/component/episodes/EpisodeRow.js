import React, {Component} from "react";

class EpisodeRow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      glyphicon: 'glyphicon glyphicon-pencil'
    }
  }

  render() {
    const {episode} = this.props;
    return (
      <div className="episodeRow">
        <div>
          <input placeholder="time"
                 value={episode.time}
                 required
          />
        </div>
        <div>
          <input placeholder="location"
                 value={episode.idLocation}
                 required
          />
        </div>
        <div id="description">
          <input placeholder="short description"
                 value={episode.description}
                 required
          />
        </div>
        <button type="button" disabled={!this.props.tripSelected}>
          <span className={this.state.glyphicon}/>
        </button>
      </div>
    )
  }
}

export default EpisodeRow;
