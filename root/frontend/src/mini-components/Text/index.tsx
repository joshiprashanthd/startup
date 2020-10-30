import React from "react";
import { StyledText } from "./styles";

export enum FontSize {
  LARGE = 20,
  MEDIUM = 18,
  NORMAL = 16,
  CAPTION = 14,
  SMALL = 12,
}

export enum FontWeight {
  THIN = 100,
  LIGHT = 300,
  REGULAR = 400,
  BOLD = 700,
  BLACK = 900,
}

interface IProps {
  children?: any;
  fontSize?: FontSize | string;
  fontWeight?: FontWeight;
  fontColor?: string;
}

export const Text: React.FC<IProps> = function ({
  children = null,
  fontSize = FontSize.NORMAL,
  fontWeight = FontWeight.REGULAR,
  fontColor = "black",
}) {
  return (
    <StyledText
      fontSize={fontSize}
      fontWeight={fontWeight}
      fontColor={fontColor}
    >
      {children}
    </StyledText>
  );
};
