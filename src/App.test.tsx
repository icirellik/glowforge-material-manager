import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    // The app polls chrome storage on an interval, don't let it run after the
    // test.
    vi.useFakeTimers();

    vi.stubGlobal('chrome', {
      storage: {
        local: {
          get: (keys: unknown, cb: (items: object) => void) => cb({}),
          set: (items: object, cb: () => void) => cb(),
        },
        sync: {
          get: (keys: unknown, cb: (items: object) => void) => cb({}),
          getBytesInUse: (keys: unknown, cb: (bytes: number) => void) => cb(0),
        },
      },
      tabs: {
        query: (query: unknown, cb: (tabs: object[]) => void) => cb([]),
      },
      permissions: {
        contains: async () => false,
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App platform="linux" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
