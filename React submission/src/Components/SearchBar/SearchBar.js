import React from 'react';
import './SearchBar.css';
import $ from 'jquery';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(e) {
    this.props.onNameChange(this.props.term, e.target.value);
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder={`Enter ${this.props.text}.`} value={this.props.terms[this.props.term]} onChange={this.handleTermChange}/>
      </div>
    );
  }
}
