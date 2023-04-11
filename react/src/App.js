import logo from './logo.svg';
import React from "react";
import './App.css';
import Character from "./Character";
function App() {
  return (
    <div className="App">
      <h1>List of Marvel characters</h1>
      <p>Add characters to your favorites by clicking on them</p>
      <Character/>
    </div>
  );
}

export default App;
