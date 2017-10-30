import React from 'react';
import './App.css';

import Spotify from '../../Util/Spotify.js';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    Spotify.getAccessToken();
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

  updateSearchTerm(term) {
    this.setState({ searchTerm: term });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    if (Spotify.savePlaylist(this.state.playlistName, trackURIs)) {
      this.setState({ searchTerm: '', searchResults: [], playlistName: '', playlistTracks: [] });
    }
  }

  search() {
    Spotify.search(this.state.searchTerm).then(results => {
      this.setState({ searchResults: results })
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar term={this.state.searchTerm} onNameChange={this.updateSearchTerm} onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults tracks={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist name={this.state.playlistName} onNameChange={this.updatePlaylistName}
              tracks={this.state.playlistTracks} onRemove={this.removeTrack}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}
