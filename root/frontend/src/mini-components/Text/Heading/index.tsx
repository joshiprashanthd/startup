import React from "react";
import { StyledHeading } from "./styles";

export enum HeadingSize {
  LARGE = 4,
  MEDIUM = 3.2,
  NORMAL = 2.6,
  SMALL = 1.6,
}

export enum HeadingWeight {
  THIN = 100,
  LIGHT = 300,
  REGULAR = 400,
  SEMIBOLD = 500,
  BOLD = 700,
  BLACK = 900,
}

interface IProps {
  children?: any;
  fontSize?: HeadingSize | string;
  fontWeight?: HeadingWeight;
  fontColor?: string;
  padding?: string;
  margin?: string;
}

export const Heading: React.FC<IProps> = function ({
  children = null,
  fontSize = HeadingSize.NORMAL,
  fontWeight = HeadingWeight.REGULAR,
  fontColor = "black",
  padding = "0px",
  margin = "0px",
}) {
  return (
    <StyledHeading
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontColor={fontColor}
      padding={padding}
      margin={margin}
    >
      {children}
    </StyledHeading>
  );
};
