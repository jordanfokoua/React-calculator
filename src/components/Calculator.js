import React from "react";

import Button from "./shared/Button";
import Display from "./shared/Display";

const calculatorStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
};

const wrapperStyle = {
  height: "400px",
  width: "25em"
};

const rowStyle = {
  display: "flex",
  width: "100%"
};

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        ["C", "+/-", "%", "/"],
        ["7", "8", "9", "X"],
        ["4", "5", "6", "-"],
        ["1", "2", "3", "+"],
        ["0", ".", "="]
      ],
      displayInput: 0
    };
  }

  render() {
    const { rows, displayInput } = this.state;
    return (
      <div style={calculatorStyle}>
        <div style={wrapperStyle}>
          <Display input={displayInput} />
          {rows.map((row, i) => (
            <div key={i} style={rowStyle}>
              {row.map((input, j) => (
                <Button
                  key={`${i}-${j}`}
                  value={input}
                  onClick={this.onClick}
                ></Button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  onClick = value => {
    if (!isNaN(value) || value === ".")
      return this.setState(state => ({
        ...state,
        displayInput:
          state.displayInput === 0 ? value : state.displayInput + value
      }));

    if (value === "C" || value === "+/-" || value === "%")
      return this.onClickAction(value);
    return this.onClickOperator(value);
  };

  onClickOperator = value => {
    console.log("TCL: onClickOperator -> value", value);
  };

  onClickAction = value => {
    switch (value) {
      case "C":
        this.setState(state => ({
          ...state,
          displayInput: 0
        }));
        break;
        
      case "+/-":
        this.setState(state => ({
          ...state,
          displayInput: state.displayInput * -1
        }));
        break;

      default:
        break;
    }
    console.log("TCL: onClickAction -> value", value);
  };
}

export default Calculator;
