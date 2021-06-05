import React from 'react';

import { display } from './Display.module.css';

export const Display = ({ type, currentDisplay }) => {
  const label = {
    filter: 'Filter by',
    sort: 'Sort by',
  };
  return (
    <div className={display}>
      <label>{label[type]}</label>
      <input data-testid={type} className="u-border" readOnly value={currentDisplay || '-'} />
    </div>
  );
};
