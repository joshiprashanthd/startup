import React from "react";
import { Link } from "./Link";
import { Heading } from "./Heading";
import { StyledText } from "./styles";

export enum FontSize {
  LARGE = 18,
  MEDIUM = 16,
  NORMAL = 14,
  CAPTION = 13,
  SMALL = 12,
}

export enum FontWeight {
  THIN = 100,
  LIGHT = 300,
  REGULAR = 400,
  SEMIBOLD = 500,
  BOLD = 700,
  BLACK = 900,
}

interface IProps {
  children?: any;
  fontSize?: FontSize | string;
  fontWeight?: FontWeight;
  fontColor?: string;
  lineHeight?: number;
  padding?: string;
  margin?: string;
  display?: string;
}

export const Text: React.FC<IProps> & {
  Heading: typeof Heading;
  Link: typeof Link;
} = function ({
  children = null,
  fontSize = FontSize.NORMAL,
  fontWeight = FontWeight.REGULAR,
  fontColor = "black",
  padding = "0px",
  margin = "0px",
  lineHeight = 1,
  display = "inline",
}) {
  return (
    <StyledText
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontColor={fontColor}
      padding={padding}
      margin={margin}
      display={display}
      lineHeight={lineHeight}
    >
      {children}
    </StyledText>
  );
};

Text.Heading = Heading;
Text.Link = Link;
