import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App
    connected={false}
    platform="linux"
  />, div);
  ReactDOM.unmountComponentAtNode(div);
});
