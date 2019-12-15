import React from "react";

// This is a default style that applies to all buttons
const defaultButtonStyle = {
  display: "flex",
  height: "4em",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.4em",
  flex: 1
};

// This style applies to number buttons
const numberButton = {
  ...defaultButtonStyle,
  backgroundColor: "#333333",
  color: "#fff",
  outline: "1px solid #888"
};

// This style applies to action buttons
const actionButton = {
  ...defaultButtonStyle,
  backgroundColor: "#A6A6A6",
  color: "#000",
  outline: "1px solid #888"
};

// This style applies to operator buttons
const operatorButton = {
  ...defaultButtonStyle,
  backgroundColor: "#FC9426",
  color: "#FFF",
  outline: "1px solid #888"
};

const Button = ({ value, onClick, type }) => {
  return (
    <div
      style={
        isOperator(value)
          ? numberButton
          : isAction(value)
          ? actionButton
          : operatorButton
      }
    >
      {value}
    </div>
  );
};

const isOperator = val => !isNaN(val) || val === ",";

const isAction = val => val === "AC" || val === "+/-" || val === "%";

export default Button;
