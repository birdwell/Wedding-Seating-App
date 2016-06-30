import React, { PropTypes } from 'react';

const ListGroup = ({items = [], onClick, header}) => {
  let listItems = items.map( (item, index) => {
    return (
      <li
        key={index}
        onClick={() => { onClick(item); } }
        className="list-group-item">
        {item}
      </li>);
    });

    return (
      <span>
        <h4>{header}</h4>
        <ul className="list-group">
          {listItems}
        </ul>
      </span>
    );
  };

  ListGroup.propTypes = {
    items: PropTypes.array,
    header: PropTypes.string,
    onClick: PropTypes.func
  };

  export default ListGroup;
