import React from 'react';
import './SearchBarField.css';

import SearchBar from '../SearchBar/SearchBar.js';

export default class SearchBarField extends React.Component {
  render() {
    return (
      <div className='SearchBarField'>
        <SearchBar terms={this.props.terms} term='track' text='a song' onNameChange={this.props.onNameChange} />
        <SearchBar terms={this.props.terms} term='artist' text='an artist' onNameChange={this.props.onNameChange} />
        <SearchBar terms={this.props.terms} term='album' text='an album' onNameChange={this.props.onNameChange} />
        <a onClick={this.props.onSearch}>SEARCH</a>
      </div>
    );
  }
}
