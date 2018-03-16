/* global chrome:true */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

chrome.storage.local.get(null, result => {
  console.log('Refreshing materials.');
  console.log(result);
  let materials;
  if (result && result.materials) {
    materials = result.materials;
  } else {
    materials = [];
  }
  ReactDOM.render(<App materials={materials}/>, document.getElementById('root'));
});

registerServiceWorker();
