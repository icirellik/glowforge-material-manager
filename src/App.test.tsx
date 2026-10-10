import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    // The app polls chrome storage on an interval, don't let it run after the
    // test.
    vi.useFakeTimers();

    (window as any).chrome = {
      storage: {
        local: {
          get: (keys: any, cb: any) => cb({}),
          set: (items: any, cb: any) => cb(),
        },
        sync: {
          get: (keys: any, cb: any) => cb({}),
          getBytesInUse: (keys: any, cb: any) => cb(0),
        },
      },
    };
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App
      connected={false}
      platform="linux"
    />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
