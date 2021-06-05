import '@testing-library/jest-dom/extend-expect';
import mockFetch from './mockFetch';

beforeEach(() => window.fetch = mockFetch);
