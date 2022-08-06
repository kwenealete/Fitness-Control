import casual from 'casual';
import { PAGINATION_QUERY } from '../components/Pagination';

// seed it so we get consistent results
casual.seed(777);

const fakeMeasurement = () => ({
  // __typename: 'Measurement',
  id: 'abc123',
  weight: 50,
  user: null
  
});

const fakeUser = (overrides) => ({
  __typename: 'User',
  id: '4234',
  name: casual.name,
  email: casual.email,
  permissions: ['ADMIN'],
  ...overrides,
});

// Fake LocalStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

function makePaginationMocksFor(length) {
  return [
    {
      request: { query: PAGINATION_QUERY },
      result: {
        data: {
          _allMeasurementsMeta: {
            count: length,
          },
          itemsConnection: {
            __typename: 'aggregate',
            aggregate: {
              count: length,
              __typename: 'count',
            },
          },
        },
      },
    },
  ];
}

export {
  makePaginationMocksFor,
  LocalStorageMock,
  fakeMeasurement,
  fakeUser,
};
