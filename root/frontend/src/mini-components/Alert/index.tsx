import React from "react";
import { StyledAlert } from "./styles";

interface IProps {
  show?: boolean;
  message: string;
}

export const Alert: React.FC<IProps> & {} = function ({
  show = false,
  message = null,
}) {
  return <>{show && <StyledAlert>{message}</StyledAlert>}</>;
};
