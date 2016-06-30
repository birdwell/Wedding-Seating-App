import React, { PropTypes } from 'react'

const Result = ({intro, result, onButtonClick}) => {
  return (
    <span>
      <div className="introContainer">
        <p className="intro">{intro}</p>
      </div>
      <h4 className="tbl-header">Table</h4>
      <h3 className="result">{result || ''}</h3>
      <button className="btn btn-primary tbl" onClick={onButtonClick}>Find Another Seat</button>
    </span>
  );
}

export default Result;
