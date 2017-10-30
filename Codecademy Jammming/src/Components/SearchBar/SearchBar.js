import React from 'react';
import './SearchBar.css';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" value={this.props.term} onChange={this.handleTermChange}/>
        <a onClick={this.props.onSearch}>SEARCH</a>
      </div>
    );
  }
}
