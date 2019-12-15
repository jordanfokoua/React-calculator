import React from "react";

const displayStyle = {
  display: "flex",
  backgroundColor: "#000",
  color: "#FFF",
  height: "15vh",
  justifyContent: "flex-end",
  alignItems: "flex-end",
  fontSize: "3em",
  padding: "0 10px 10px 0"
};

const Display = ({ input }) => {
  return <div style={displayStyle}>{input}</div>;
};

export default Display;
