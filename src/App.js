/* global chrome:true */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Tests the roundtrip time of sendRequest().
function testRequest() {
  console.log("resultsRequest", "running...");
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    chrome.tabs.sendRequest(tab.id, {counter: 1}, function handler(response) {
      if (response.counter < 1000) {
        chrome.tabs.sendRequest(tab.id, {counter: response.counter}, handler);
      } else {
        console.log("resultsRequest",  response.counter + "usec");
      }
    });
  });
}
// Tests the roundtrip time of Port.postMessage() after opening a channel.
function testConnect() {
  console.log("resultsConnect", "running...");
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var port = chrome.tabs.connect(tabs[0].id);
    port.postMessage({counter: 1});
    port.onMessage.addListener(function getResp(response) {
      if (response.counter < 1000) {
        port.postMessage({counter: response.counter});
      } else {
        console.log("resultsConnect",  response.counter + "usec");
      }
    });
  });
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button>add</button>
      </div>
    );
  }
}

export default App;
