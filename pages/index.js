import { useEffect, useState } from 'react';

import { fetcher } from '../shared/util';
import { DEFAULT_LIST_ITEM } from '../components/List/List';
import { Display, Table, Kpi } from '../components';

import {
  container,
  kpiContainer,
  section,
  critical,
  displayContainer,
  tableContainer,
} from '../styles/Dashboard.module.css';

export default function Dashboard({ companies }) {
  const [filter, setFilter] = useState(DEFAULT_LIST_ITEM.filter);
  const [sort, setSort] = useState(DEFAULT_LIST_ITEM.sort);
  const [companyId, setCompanyId] = useState('db79f4');
  const [companyData, setCompanyData] = useState();
  const [critial, setCritial] = useState(false);

  const requestCompany = async (url) => {
    const data = await fetcher(url);
    setCompanyData(data);
  };

  useEffect(() => {
    if (filter && companyId) {
      const {
        value: { time_unit, time_unit_count },
      } = filter;
      const query = `${companyId}?time_unit=${time_unit}&time_unit_count=${time_unit_count}`;
      const url = '/api/company/';
      requestCompany(`${url}${query}`);
    }
  }, [filter, companyId]);

  const handleChange = ({ target }) => {
    setCritial(target.checked);
  };

  return (
    <main className={container}>
      <section className={section}>
        <div>
          <div className={displayContainer}>
            <Display type="filter" currentDisplay={filter.label} onClick={setFilter} />
          </div>
          <div className={kpiContainer}>
            <Kpi newCompany={companyId} newFilter={filter} companyData={companyData || companies[0].lastMonth} />
          </div>
        </div>
      </section>

      <section className={section}>
        <div>
          <div className={displayContainer}>
            <label title="highlight avg NPS lower than 50" className={critical}>
              <input onChange={handleChange} type="checkbox" />
              Show critical
            </label>
            <Display type="sort" currentDisplay={sort.label} onClick={setSort} />
          </div>
          <div className={tableContainer}>
            <Table
              showCritical={critial}
              selectedCompany={companyId}
              sortOrder={sort.value}
              filter={filter}
              companies={companies}
              onClick={setCompanyId}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps() {
  const host = process.env.API_URL || 'http://localhost:3000/';
  const res = await fetch(`${host}api/companies`);
  const companies = await res.json();

  return { props: { companies } };
}
