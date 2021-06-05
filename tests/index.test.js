import { act, fireEvent, render, screen } from '@testing-library/react';

import Dashboard from '../pages';
import { DEFAULT_LIST_ITEM } from '../components/List/List';
import { companies } from '../shared/mock';

jest.useFakeTimers();

describe('KPI', () => {
  it('renders KDI with initial values', async () => {
    render(<Dashboard companies={companies} />);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(screen.getByText('Active source')).toBeInTheDocument();
    expect(screen.getByText('Weekly active')).toBeInTheDocument();
    expect(screen.getByText('NPS')).toBeInTheDocument();
  });

  it('show loading when request new data', async () => {
    render(<Dashboard companies={companies} />);

    await act(async () => {
      jest.runAllTimers();
    });

    const lastQuarter = screen.getByRole('button', { name: /last quarter/i });

    fireEvent.click(lastQuarter);

    expect(screen.getAllByTestId('loading').length).toBeGreaterThanOrEqual(1);

    await act(async () => {
      jest.runAllTimers();
    });
  });

  it('show loading when request new data', async () => {
    render(<Dashboard companies={companies} />);

    await act(async () => {
      jest.runAllTimers();
    });

    const lastQuarter = screen.getByRole('button', { name: /last quarter/i });

    expect(screen.getByText('41')).toBeInTheDocument();
    expect(screen.getByText('90')).toBeInTheDocument();

    fireEvent.click(lastQuarter);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(screen.getByText('83')).toBeInTheDocument();
    expect(screen.getByText('59')).toBeInTheDocument();
    expect(screen.getByText('66')).toBeInTheDocument();
  });
});

describe('List', () => {
  it('filter display shows initial filter', async () => {
    render(<Dashboard companies={companies} />);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(screen.getByTestId('filter').value).toBe(DEFAULT_LIST_ITEM.filter.label);
  });

  it('sort display shows initial sort order', async () => {
    render(<Dashboard companies={companies} />);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(screen.getByTestId('sort').value).toBe(DEFAULT_LIST_ITEM.sort.label);
  });
});

describe('Table', () => {
  it('renders table with initial companies', async () => {
    render(<Dashboard companies={companies} />);

    await act(async () => {
      jest.runAllTimers();
    });

    expect(screen.getByText('Gronda')).toBeInTheDocument();
    expect(screen.getByText('Mock Company B')).toBeInTheDocument();
    expect(screen.getByText('Mock Company A')).toBeInTheDocument();
  });

  it('Reoder table base on Sort order', async () => {
    render(<Dashboard companies={companies} />);

    await act(async () => {
      jest.runAllTimers();
    });

    const contract = screen.getByRole('button', { name: /contract/i });

    const table = screen.getByTestId('table').innerHTML;

    fireEvent.click(contract);

    const reorderedTable = screen.getByTestId('table').innerHTML;

    expect(screen.getByTestId('sort').value).toBe('Contract');
    expect(table).not.toMatch(reorderedTable);
  });

  it("highlight lower nps avg when ' show critical' is checked", async () => {
    render(<Dashboard companies={companies} />);

    await act(async () => {
      jest.runAllTimers();
    });

    const critical = screen.getByText('Show critical');

    fireEvent.click(critical);

    const lowerNpsAvg = screen.getByText('30');

    expect(lowerNpsAvg.parentElement.classList[0]).toBe('u-critical');
  });
});
