import React, {Component} from 'react';
import FuzzySearch from './FuzzySearch';

const seating = require('./seating');
const NOT_FOUND = 'Not Found';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { result: '', intro: '', showForm: true};
    this.showResult = this.showResult.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  showResult(name) {
    let person = seating[name],
        table = person && seating[name].table,
        guests = person && seating[name].guests || null,
        guestsIntro = guests && `and ${guests} are` || 'is',
        intro = `${name} ${guestsIntro} seated at table`;

    this.setState({ result: table || NOT_FOUND, intro: intro, showForm: false });
  }

  onButtonClick() {
    this.setState({ showForm: true, result: null, intro: null });
  }

  render() {
    let result = this.state.result || '',
        intro = result !== NOT_FOUND ? this.state.intro : '';

    return (
        <section className="content">
          <div className="header-image">
              <div className="background"/>
              <div className="logo"/>
          </div>
          <h2 className="heading">Wedding Seating</h2>
          <hr/>
          {this.state.showForm ? <FuzzySearch className="row" showResult={this.showResult}/> : null}
          <h4 className="intro">{intro}</h4>
          <h3 className="row result">{result}</h3>
          {!this.state.showForm ? <button className="btn btn-primary tbl" onClick={this.onButtonClick}>Find Another Seat</button> : null}
        </section>
    );
  }
}

App.propTypes = { showForm: React.PropTypes.bool };
App.defaultProps = { showForm: true };
