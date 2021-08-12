import React, { useState } from 'react';

import { List } from '../List/List';
import { display, expand, hidden } from './Display.module.css';

export const Display = ({ type, currentDisplay, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const label = {
    filter: 'Filter by',
    sort: 'Sort by',
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded)
  }

  const handleSelection = (value) => {
    onClick(value);
    handleClick();
  }

  return (
    <div className={display}>
      <label>{label[type]}</label>
      <input onClick={handleClick} data-testid={type} className="u-border" readOnly value={currentDisplay || '-'} />
      <div className={ isExpanded ? expand : hidden}>
        <List type={type} onClick={handleSelection} />
      </div>
    </div>
  );
};
