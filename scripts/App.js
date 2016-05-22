import React, {Component} from 'react';
import FuzzySearch from './FuzzySearch';

export default class App extends Component {
  render() {
    return (
        <section className="content">
          <h2 className="heading">Wedding Seating</h2>
          <FuzzySearch />
        </section>
    );
  }
}
