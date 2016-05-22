import React, { PropTypes } from 'react';

const ListGroup = (props) => {
  let items = props.items.map( (item) => {
    return (
      <li
        onClick={() => { props.onClick(item); } }
        className="list-group-item">
        {item}
      </li>);
  });

  return (
    <span>
      {!props.header || items.length === 0 ? null : <h4>{props.header}</h4>}
      <ul className="list-group">
        {items}
      </ul>
    </span>
  );
};

ListGroup.propTypes = {
  listItems: React.PropTypes.array
};

export default ListGroup;
