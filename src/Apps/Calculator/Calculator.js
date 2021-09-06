import React from "react";
import Button from "./Button.js";
import "./style/Calculator.css";

function Screen(props) {
  const currentNum = props.currentNum.toString();
  const font_size = currentNum.length < 12 ? "50px" : `${370 / currentNum.length * 1.5}px`
  return (
    <div id="screen">
      <span className={props.className} style={{fontSize: font_size}}>{currentNum}</span>
    </div>
  );
}

class Calculator extends React.Component {

  constructor() {
    super();
    this.state = {
      left: null,
      right: null,
      currentNum: "0",
      numberIsFixed: false,
      op: null,
      complete: false,
      pushedButton: null,
      classForScreen: null
    };
  }

  render() {

    return (
      <div id="calculator">
        <Screen className={this.state.classForScreen}currentNum={this.state.currentNum}/>
        <Button value="C" app={this}></Button>
        <Button value="±" app={this}></Button>
        <Button value="%" app={this}></Button>
        <Button value="÷" app={this}></Button>
        <Button value="7" app={this}></Button>
        <Button value="8" app={this}></Button>
        <Button value="9" app={this}></Button>
        <Button value="×" app={this}></Button>
        <Button value="4" app={this}></Button>
        <Button value="5" app={this}></Button>
        <Button value="6" app={this}></Button>
        <Button value="−" app={this}></Button>
        <Button value="1" app={this}></Button>
        <Button value="2" app={this}></Button>
        <Button value="3" app={this}></Button>
        <Button value="+" app={this}></Button>
        <Button value="0" app={this}></Button>
        <Button value="." app={this}></Button>
        <Button value="=" app={this}></Button>
        <span className="calc-back"></span>
      </div>
    );
  }
}

export default Calculator;
