import React from "react";
import { FontWeight, Text } from "../../mini-components/Text";
import { StyledButton } from "./styles";

interface IProps {
  children?: any;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  backgroundColor?: string;
  hoverColor?: string;
  activeColor?: string;
  transition?: string;
}

export const Button: React.FC<IProps> = function ({
  children = null,
  padding = "8px",
  margin = "8px",
  borderRadius = "4px",
  backgroundColor = "#256de8",
  hoverColor = "#1f5aaa",
  activeColor = "#1a4da3",
  transition = "all .25s ease",
}) {
  return (
    <StyledButton
      activeColor={activeColor}
      padding={padding}
      margin={margin}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      transition={transition}
    >
      <Text fontWeight={FontWeight.BOLD} fontColor="white">
        {children}
      </Text>
    </StyledButton>
  );
};
