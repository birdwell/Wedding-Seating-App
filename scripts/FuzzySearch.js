import React, { Component } from 'react';
import fuzzy from 'fuzzy';

const guests = require('./names');

class FuzzySearch extends Component {
  constructor(props){
    super(props);

    this.state = { term: '' };
    this.suggestions = [];

    // Bind function callbacks
    this.displaySearchResults = this.displaySearchResults.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  onResultClick(name) {
    this.searchComplete(name);
  }

  displaySearchResults() {
    const search = this.state.term;
    const options = {
      extract(element){
        return element.name;
      }
    };

    const filtered = fuzzy.filter(search, guests, options);
    this.suggestions = [];

    this.results = filtered.slice(0, 5).map((person) => {
      this.suggestions.push(person.string);

      return (
        <li
          className="list-group-item"
          key={person.index}
          onClick={this.onResultClick.bind(this, person.string)}
          >
          {person.string}
        </li>
      );
    });
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.searchComplete();
  }

  searchComplete(name) {
    this.props.showResult(name || this.state.term, this.suggestions);
    this.setState({ term: '' });
    this.results = null;
  }

  render() {
    return (
      <form
        autoComplete="off"
        onSubmit={this.onFormSubmit}>
        <div className="form-group">
          <input
            placeholder="Enter Your Name"
            onKeyDown={this.displaySearchResults}
            onChange={this.onInputChange}
            type="text"
            autoComplete="off"
            ref="fuzzyInput"
            id="search"
            value={this.state.term}
            className="search form-control">
          </input>
          <ul className="list-group" id="lists">
            {this.results}
          </ul>
        </div>
        <button type="submit" className="btn btn-primary tbl">Find Your Table</button>
      </form>
    );
  }
}

FuzzySearch.propTypes = { showResult: React.PropTypes.func };
export default FuzzySearch;
