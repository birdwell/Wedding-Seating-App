import React, {Component} from 'react';

import FuzzySearch from './FuzzySearch';
import Header from './Header';
import ListGroup from './ListGroup';
import Result from './Result';

const seating = require('./seating');
const NOT_FOUND = 'Not Found';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: '',
      value: '',
      showForm: true,
      showSuggestions: false
    };
  }

  showResult = (name, suggestions) => {
    const person = seating[name];
    if (!person || !person.table) {
      this.setState({ result: NOT_FOUND, suggestions: suggestions });
      return;
    }

    const {table, guests} = person;
    let guestsIntro = (guests.length > 0 && `and ${guests.join(', ')} are`) || 'is';
    let value = `${name} ${guestsIntro} seated at`;

    if(table){
      this.setState({ result: table || NOT_FOUND, value, showForm: false, showSuggestions: false });
    }
  }

  onButtonClick = () => {
    this.setState({ showForm: true, result: null, value: null, showSuggestions: false });
  }

  showContent() {
    const {showForm, showSuggestions, suggestions} = this.state;
    const {value, result} = this.state;

    if (!value && !result) {
      return <FuzzySearch className="row" showResult={this.showResult}/>;
    } else if (result !== NOT_FOUND && value) {
      return <Result intro={value} result={result} onButtonClick={this.onButtonClick} />
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
