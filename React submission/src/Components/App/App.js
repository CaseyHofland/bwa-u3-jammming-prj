import React from 'react';
import './App.css';

import Spotify from '../../Util/Spotify.js';
import SearchBarField from '../SearchBarField/SearchBarField.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    Spotify.getAccessToken();

    this.state = {
      searchTerms: {
        track: '',
        album: '',
        artist: ''
      },
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    };

    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.search = this.search.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  updateSearchTerm(property, term) {
    let terms = this.state.searchTerms;
    terms[property] = term;
    this.setState({ searchTerms: terms });
  }

  search() {
    Spotify.search(this.state.searchTerms).then(results => {
      this.setState({ searchResults: results });
    });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  addTrack(track) {
    if(!this.state.playlistTracks.includes(track)) {
      let list = this.state.playlistTracks.slice();
      list.push(track);
      this.setState({ playlistTracks: list });
    }
  }

  removeTrack(track) {
    let list = this.state.playlistTracks.slice();

    const index = list.indexOf(track);
    if (index > -1) {
      list.splice(index, 1);
      this.setState({ playlistTracks: list });
    }
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    if (Spotify.savePlaylist(this.state.playlistName, trackURIs)) {
      this.setState({ searchTerms: {track: '', album: '', artist: ''}, searchResults: [], playlistName: '', playlistTracks: [] });
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBarField terms={this.state.searchTerms} onNameChange={this.updateSearchTerm} onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults tracks={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist name={this.state.playlistName} onNameChange={this.updatePlaylistName}
              tracks={this.state.playlistTracks} onRemove={this.removeTrack}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}
