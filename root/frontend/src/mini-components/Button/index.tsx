import React from "react";
import { FontWeight, Text } from "../../mini-components/Text";
import { StyledButton } from "./styles";

interface IProps {
  children?: any;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  disabled?: boolean;
  fontColor?: string;
  disabledFontColor?: string;
  backgroundColor?: string;
  disabledBackgroundColor?: string;
  hoverBackgroundColor?: string;
  activeBackgroundColor?: string;
  transition?: string;
  [K: string]: any;
}

export const Button: React.FC<IProps> = function ({
  children = null,
  padding = "8px",
  margin = "8px",
  borderRadius = "4px",
  backgroundColor = "#256de8",
  fontColor = "white",
  hoverColor = "#1f5aaa",
  activeColor = "#1a4da3",
  transition = "all .25s ease",
  disabled = false,
  disabledFontColor = "white",
  disabledBackgroundColor = "grey",
  ...restProps
}) {
  return (
    <StyledButton
      activeColor={activeColor}
      padding={padding}
      margin={margin}
      borderRadius={borderRadius}
      fontColor={fontColor}
      disabled={disabled}
      disabledBackgroundColor={disabledBackgroundColor}
      disabledFontColor={disabledFontColor}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      transition={transition}
      {...restProps}
    >
      <Text fontWeight={FontWeight.SEMIBOLD} fontColor="white">
        {children}
      </Text>
    </StyledButton>
  );
};
