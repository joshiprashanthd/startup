import React from "react";
import "./Spinner.css";

interface IProps {
  width?: string;
  height?: string;
}

export const Spinner: React.FC<IProps> = function ({
  width = "10px",
  height = "10px",
}) {
  return (
    <div className="spinner" style={{ width: width, height: height }}>
      <div className="double-bounce1"></div>
      <div className="double-bounce2"></div>
    </div>
  );
};
