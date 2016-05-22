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
    <ul className="list-group">
      {items}
    </ul>
  );
};

ListGroup.propTypes = {
  listItems: React.PropTypes.array
};

export default ListGroup;
