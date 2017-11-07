import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList.js';

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input placeholder='New PlayList' value={this.props.name} onChange={this.handleNameChange}/>
        <TrackList tracks={this.props.tracks} isRemoval={true} onRemove={this.props.onRemove} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
