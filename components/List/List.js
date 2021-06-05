import React from 'react';

import { list } from './List.module.css';

const lists = {
  filter: [
    { label: 'This week', value: { time_unit: 'WEEK', time_unit_count: '0' } },
    { label: 'Last week', value: { time_unit: 'WEEK', time_unit_count: '1' } },
    { label: 'This month', value: { time_unit: 'MONTH', time_unit_count: '0' } },
    { label: 'Last month', value: { time_unit: 'MONTH', time_unit_count: '1' } },
    { label: 'This quarter', value: { time_unit: 'QUARTER', time_unit_count: '0' } },
    { label: 'Last quarter', value: { time_unit: 'QUARTER', time_unit_count: '1' } },
    { label: 'This year', value: { time_unit: 'YEAR', time_unit_count: '0' } },
    { label: 'Last year', value: { time_unit: 'YEAR', time_unit_count: '1' } },
  ],
  sort: [
    { label: 'Id', value: 'id' },
    { label: 'Company name', value: 'name' },
    { label: 'Segment', value: 'segment' },
    { label: 'Contract', value: 'contract' },
    { label: 'Best NPS avg', value: 'npsAvg_best' },
    { label: 'Worst NPS avg', value: 'npsAvg' },
  ],
};

export const DEFAULT_LIST_ITEM = {
  filter: { label: 'Last month', value: { time_unit: 'MONTH', time_unit_count: '1' } },
  sort: { label: 'Id', value: 'id' },
};

export const List = ({ type, onClick }) => {
  const handleClick = ({ target }) => {
    const value = JSON.parse(target.dataset.value);
    onClick(value);
  };

  return (
    <div className={`${list} u-border`}>
      <ul>
        {lists[type]?.map((listItem) => (
          <li key={listItem.label}>
            <button data-value={JSON.stringify(listItem)} onClick={handleClick}>
              {listItem.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
