import React from "react";
import { StyledAlert } from "./styles";
import { FontWeight, Text } from "../Text";

interface IProps {
  children?: any;
  show?: boolean;
}

export const Alert: React.FC<IProps> & {} = function ({
  show = false,
  children = null,
}) {
  return (
    <>
      {show && (
        <StyledAlert>
          <Text>{children}</Text>
        </StyledAlert>
      )}
    </>
  );
};
