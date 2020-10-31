import React from "react";
import { FontSize, FontWeight } from "..";
import { StyledLink } from "./styles";

interface IProps {
  children?: any;
  fontSize?: FontSize | string;
  fontWeight?: FontWeight;
  fontColor?: string;
  lineHeight?: number;
  padding?: string;
  margin?: string;
  display?: string;
  hoverFontColor?: string;
  hoverTextDecoration?: string;
}

export const Link: React.FC<IProps> = function ({
  children = null,
  fontSize = FontSize.NORMAL,
  fontWeight = FontWeight.REGULAR,
  fontColor = "black",
  padding = "0px",
  margin = "0px",
  lineHeight = 1,
  display = "inline",
  hoverFontColor = "black",
  hoverTextDecoration = "underline",
  ...restProps
}) {
  return (
    <StyledLink
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontColor={fontColor}
      padding={padding}
      margin={margin}
      display={display}
      lineHeight={lineHeight}
      hoverFontColor={hoverFontColor}
      hoverTextDecoration={hoverTextDecoration}
      {...restProps}
    >
      {children}
    </StyledLink>
  );
};
