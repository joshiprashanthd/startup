import React from "react";
import { StyledText } from "./styles";

enum FontSize {
  LARGE = 2,
  MEDIUM = 1.4,
  NORMAL = 0.8,
  CAPTION = 0.65,
  SMALL = 0.5,
}

enum FontWeight {
  THIN = 100,
  LIGHT = 300,
  REGULAR = 400,
  BOLD = 700,
  BLACK = 900,
}

interface IProps {
  children?: any;
  fontSize?: FontSize;
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
