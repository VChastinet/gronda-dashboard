import React from 'react';

import style, { table, visualId, active } from './Table.module.css';

export const Table = ({
  filter,
  showCritical,
  selectedCompany,
  sortOrder,
  companies,
  onClick,
}) => {
  const sortedCompanies = companies.sort((a, b) => {
    if (sortOrder.match('best')) {
      const [key] = sortOrder.split('_');
      return b[key] - a[key];
    }

    if (a[sortOrder] < b[sortOrder]) {
      return -1;
    } else if (a[sortOrder] > b[sortOrder]) {
      return 1;
    }

    return 0;
  });

  const handleClick = (id) => {
    onClick(id);
  };

  const setClass = (id, npsAvg) => {
    const activeClass = selectedCompany === id ? active : '';
    const criticalClass = (showCritical && npsAvg < 50) ? 'u-critical' : '';
    return `${activeClass} ${criticalClass}`
  }

  const filterToKey = ({ time_unit, time_unit_count }) => {
    const timeUnitCountLabel = time_unit_count === '1' ? 'last' : 'current';
    const timeUnitToLabel = time_unit.charAt(0).toUpperCase() + time_unit.toLowerCase().slice(1);
    const key = `${timeUnitCountLabel}${timeUnitToLabel}`
    return key;
  }

  return (
    <table data-testid="table" className={table}>
      <thead className="u-bold">
        <tr>
          <th>Id</th>
          <th>Company name</th>
          <th>Segment</th>
          <th>Contract</th>
          <th>Renewals</th>
          <th>NPS avg</th>
          <th>NPM last</th>
          <th>NPM first</th>
        </tr>
      </thead>
      <tbody>
        {sortedCompanies?.map(({ id, name, segment, contract, renewals, npsAvg, ...company }) => (
          <tr className={setClass(id, npsAvg)} onClick={() => handleClick(id)} key={id}>
            <td>
              <div style={{ backgroundColor: `#${id}` }} className={visualId}></div>
            </td>
            <td>{name}</td>
            <td>{segment}</td>
            <td>{contract}</td>
            <td>{renewals}</td>
            <td>{npsAvg}</td>
            <td>{company[filterToKey(filter.value)].nps.last_period}</td>
            <td>{company[filterToKey(filter.value)].nps.current_period}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
