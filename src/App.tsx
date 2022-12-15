import React from 'react';
import AppHeader from './components/app-header/app-header.js';
import BurgerMain from './components/burger-main/burger-main.js';
import { data } from './utils/data';

function App() {
  return (
    <>
      <AppHeader />
      <BurgerMain data={data} />
    </>
  );
}

export default App;

/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
