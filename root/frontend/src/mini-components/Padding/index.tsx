import React from "react";
import { StyledPadding } from "./styled";

interface IProps {
  children?: any;
  padding?: string;
}

export const Padding: React.FC<IProps> = function ({
  children = null,
  padding = "1em",
}) {
  return <StyledPadding padding={padding}>{children}</StyledPadding>;
};
