import { companies } from '../../shared/mock';

const mockFetch = async (url) => {
  if (url.match('companies')) {
    return {
      ok: true,
      status: 200,
      json: async () => companies,
    };
  }

  if (url.match('company')) {
    const response = url.match('QUARTER') ? companies[2].lastQuarter : companies[2].lastMonth
    return {
      ok: true,
      status: 200,
      json: async () => response,
    };
  }

  console.error(`Unhandled request: ${url}`);
};

export default mockFetch;
