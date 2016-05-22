import React, { Component } from 'react';
import fuzzy from 'fuzzy';

const guests = [
  {name: 'Josh Birdwell', table: 1},
  {name: 'Madison Harry', table: 2},
  {name: 'Don Birdwell', table: 3}
];

class FuzzySearch extends Component {
  constructor(props){
    super(props);

    this.state = { term: '' };
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
    this.setState({ term: name });
    this.refs.fuzzyInput.focus();
  }

  displaySearchResults() {
    const search = this.state.term,
      options = {
        extract(element){
            return element.name;
          }
      };

    const filtered = fuzzy.filter(search, guests, options);

    this.results = filtered.map((person) => {
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

    this.props.showResult(this.state.term);
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
            placeholder="Enter your name"
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
        <button type="submit" className="btn btn-primary">Find Your Table</button>
      </form>
    );
  }
}

FuzzySearch.propTypes = { showResult: React.PropTypes.func };
export default FuzzySearch;
