import React, {Component} from 'react';
import FuzzySearch from './FuzzySearch';
const seating = require('./seating');

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { result: ''};
    this.showResult = this.showResult.bind(this);
  }

  showResult(name) {
    let table = seating[name] && seating[name].table;
    this.setState({ result: table || 'Not Found' });
  }

  render() {
    let result = this.state.result || '';

    return (
        <section className="content">
          <h2 className="heading">Wedding Seating</h2>
          <FuzzySearch className="row" showResult={this.showResult}/>
          <h4 className="row result">{result}</h4>
        </section>
    );
  }
}
