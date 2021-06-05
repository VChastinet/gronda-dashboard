import React, { useEffect, useState } from 'react';

import style, { kpi, bigCircle, smallCircle } from './Kpi.module.css';
import { keyToLabel } from '../../shared/util';
import { Loading } from './Loading';

export const Kpi = ({ newFilter, newCompany, companyData }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
  }, [newFilter, newCompany]);

  useEffect(() => {
    setLoading(false);
  }, [companyData]);

  return (
    <>
      {Object.entries(companyData).map(([key, value]) => (
        <div className={`${kpi} ${style[key]}`} key={key}>
          <div>
            <p>{keyToLabel(key)}</p>
            <h3>{loading ? <Loading /> : value.current_period}</h3>
            <p>
              <span>{loading ? '-' : value.last_period}</span> Last period
            </p>
          </div>
          <div className={bigCircle}></div>
          <div className={smallCircle}></div>
        </div>
      ))}
    </>
  );
};
