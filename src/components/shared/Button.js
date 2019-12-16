import React from "react";

const layoutStyle = {
  display: "flex",
  height: "5em",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
};

const zeroButtonLayout = {
  flex: 2
};

// This is a default style that applies to all buttons
const defaultButtonStyle = {
  display: "flex",
  height: "3em",
  width: "3em",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.4em"
};

// This style applies to number buttons
const numberButton = {
  ...defaultButtonStyle,
  backgroundColor: "#505050",
  color: "#fff",
  borderRadius: "50%"
};

// This style applies to action buttons
const actionButton = {
  ...defaultButtonStyle,
  backgroundColor: "#D4D4D2",
  color: "#000",
  fontWeight: 500,
  borderRadius: "50%"
};

// This style applies to operator buttons
const operatorButton = {
  ...defaultButtonStyle,
  backgroundColor: "#FF9500",
  color: "#FFF",
  fontWeight: 500,
  borderRadius: "50%"
};

const zeroButton = {
  height: "3em",
  width: "6em",
  borderRadius: "40px",
  justifyContent: "flex-start",
  paddingLeft: "1em"
};

const Button = ({ value, onClick, type }) => {
  return (
    <div
      style={
        isZero(value)
          ? { ...layoutStyle, ...zeroButtonLayout }
          : { ...layoutStyle }
      }
    >
      <div
        onClick={() => onClick(value)}
        style={
          isNumber(value)
            ? isZero(value)
              ? { ...numberButton, ...zeroButton }
              : { ...numberButton }
            : isAction(value)
            ? { ...actionButton }
            : { ...operatorButton }
        }
      >
        {value}
      </div>
    </div>
  );
};

const isNumber = val => !isNaN(val) || val === ".";

const isAction = val => val === "C" || val === "+/-" || val === "%";

const isZero = val => val === "0" || val === 0;

export default Button;
