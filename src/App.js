import React from "react";
import Calculator from "./Apps/Calculator/Calculator";
import './style/App.css';

class App extends React.Component {
  render() {
    return (
      <div id="App">
        <Calculator />
      </div>
    );
  }
}

export default App;
