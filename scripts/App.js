import React, {Component} from 'react';
import FuzzySearch from './FuzzySearch';
import Header from './Header';
import ListGroup from './ListGroup';

const seating = require('./seating');
const NOT_FOUND = 'Not Found';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { result: '', intro: '', showForm: true, showSuggestions: false};
    this.showResult = this.showResult.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  showResult(name, suggestions) {
    let person = seating[name];
    let table = person && seating[name].table || null;
    let guests = person && seating[name].guests || null;
    let guestsIntro = guests && `and ${guests} are` || 'is';
    let intro = `${name} ${guestsIntro} seated at`;

    if(table){
      this.setState({ result: table || NOT_FOUND, intro: intro, showForm: false, showSuggestions: false });
    } else {
      this.setState({ showSuggestions: true, suggestions: suggestions });
    }
  }

  onButtonClick() {
    this.setState({ showForm: true, result: null, intro: null, showSuggestions: false });
  }

  showContent() {
    const {showForm, showSuggestions, suggestions} = this.state;

    if (showForm && !showSuggestions) {
      return <FuzzySearch className="row" showResult={this.showResult}/>;
    } else if (!showSuggestions) {
        let {result} = this.state;
        let intro = result !== NOT_FOUND ? this.state.intro : '';

        return (
          <span>
            <div className="introContainer">
              <p className="intro">{intro}</p>
            </div>
            <h4 className="tbl-header">Table</h4>
            <h3 className="result">{result || ''}</h3>
            <button className="btn btn-primary tbl" onClick={this.onButtonClick}>Find Another Seat</button>
          </span>
        );
    } else {
      return (
        <div>
          <h4>We couldn't find your table.</h4>
          <ListGroup items={suggestions} header="Did you mean:" onClick={this.showResult}/>
          <button className="btn btn-primary tbl" onClick={this.onButtonClick}>Try Again</button>
        </div>
      );
    }
  }

  render() {
    return (
        <section className="content">
          <Header />
          <h2 className="heading">Wedding Seating</h2>
          <hr/>
          {this.showContent()}
        </section>
    );
  }
}

App.propTypes = { showForm: React.PropTypes.bool };
App.defaultProps = { showForm: true };
