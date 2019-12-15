import React from "react";

// Library import
import * as math from "mathjs";

// Component import
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
        ["7", "8", "9", "x"],
        ["4", "5", "6", "-"],
        ["1", "2", "3", "+"],
        ["0", ".", "="]
      ],
      displayInput: 0,
      hiddenInput: 0, // This will be used to manage operations in the background
      operate: true
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

  /* Check if button is an Action */
  isAction = value => {
    if (value === "C" || value === "+/-" || value === "%") return true;
    return false;
  };

  /* Check if button is an operator */
  isOperator = value => {
    if (
      value === "/" ||
      value === "+" ||
      value === "-" ||
      value === "x" ||
      value === "="
    )
      return true;
    return false;
  };

  onClick = value => {
    /* Check if button is a Number then setState */
    if (!isNaN(value) || value === ".")
      return this.setState(state => ({
        ...state,
        displayInput:
          state.displayInput === 0 ? value : state.displayInput + value,
        hiddenInput: state.hiddenInput === 0 ? value : state.hiddenInput + value
      }));

    /* Check if button is an Action then call onClickAction */
    if (this.isAction(value)) return this.onClickAction(value);

    /* if button is neither an action or a number, then it's an operator */
    return this.onClickOperator(value);
  };

  onClickOperator = value => {
    const { displayInput } = this.state;
    const lastChar = displayInput.toString().charAt(displayInput.length - 1);

    /*
     * If display input is 0, no operator can be applied.
     * We simply return null (no action made)
     */

    if (displayInput === 0) return null;

    /* Check if the pressed button is the equal operator
     * If it is an equal operator, we calculate the operation
     */
    if (value === "=") {
      return this.calculate(displayInput);
    }

    /* Check if last char in string is an operator
     * If it is an operator, we replace it by the new operator
     */
    if (this.isOperator(lastChar)) {
      return this.setState(state => ({
        ...state,
        displayInput:
          state.displayInput === 0
            ? value
            : displayInput.toString().slice(0, -1) + value,
        hiddenInput:
          state.hiddenInput === 0
            ? value
            : displayInput.toString().slice(0, -1) + value
      }));
    }

    return this.setState(state => ({
      ...state,
      displayInput:
        state.displayInput === 0 ? value : state.displayInput + value,
      hiddenInput: state.hiddenInput === 0 ? value : state.hiddenInput + value
    }));
  };

  onClickAction = value => {
    switch (value) {
      case "C": // Clear action
        this.setState(state => ({
          ...state,
          displayInput: 0,
          hiddenInput: 0
        }));
        break;

      case "+/-": // Negate action
        if (isNaN(value))
          this.setState(state => ({
            ...state,
            displayInput: (state.displayInput * -1).toString(),
            hiddenInput: (state.displayInput * -1).toString()
          }));
        break;

      case "%":
        if (isNaN(value))
          this.setState(state => ({
            ...state,
            displayInput: (state.displayInput / 100).toString(),
            hiddenInput: (state.displayInput / 100).toString()
          }));
        break;

      default:
        break;
    }
  };

  calculate = value => {
    // Replace x by multiplicator operator
    if (value.includes("x")) value = value.replace("x", "*");
    const displayInput = math.evaluate(value).toString();
    this.setState(state => ({ ...state, displayInput }));
  };
}

export default Calculator;
