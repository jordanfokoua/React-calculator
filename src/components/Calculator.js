import React from "react";
import Button from "./shared/Button";

const calculatorStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100%"
};

const wrapperStyle = {
  height: "400px",
  width: "600px"
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
        ["0", ",", "="]
      ]
    };
  }

  render() {
    const { rows } = this.state;
    return (
      <div style={calculatorStyle}>
        <div style={wrapperStyle}>
          {rows.map((row, i) => (
            <div style={rowStyle}>
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

  onClick = () => {
    console.log("Pressed");
  };
}

export default Calculator;
