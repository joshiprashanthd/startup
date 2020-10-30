import React from "react";
import { StyledInput } from "./styles";

interface IProps {
  borderRadius?: string;
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  [K: string]: any;
}

export const Input: React.FC<IProps> = function ({
  borderRadius = "4px",
  margin = "8px 0 0 0",
  padding = "8px",
  backgroundColor = "#fbfbfb",
  ...restProps
}) {
  return (
    <StyledInput
      spellCheck="false"
      borderRadius={borderRadius}
      margin={margin}
      padding={padding}
      backgroundColor={backgroundColor}
      {...restProps}
    />
  );
};
