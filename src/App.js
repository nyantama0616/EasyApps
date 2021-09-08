import React from "react";
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import Calculator from "./Apps/Calculator/Calculator";
import TypingGame from "./Apps/TypingGame/TypingGame";
import './style/App.css';

class App extends React.Component {
  render() {
    return (
      <div id="App">
        <Router>
          <Switch>
            <Route exact path="/" component={TypingGame}></Route>
            <Route exact path="/" component={Calculator}></Route>
            <Route path="/Calculator" component={Calculator}></Route>
            <Route path="/TypingGame" component={TypingGame}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
