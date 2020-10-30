import React from "react";
import { StyledCard } from "./styles";

interface IProps {
  children?: any;
  width?: string;
  height?: string;
  justify?: string;
  alignItems?: string;
  direction?: string;
  padding?: string;
  borderRadius?: string;
  shadowXY?: number[];
  shadowBlur?: number;
  shadowColor?: string;
}

export const Card: React.FC<IProps> = function ({
  children = null,
  width = "100%",
  height = "fit-content",
  justify = "flex-start",
  alignItems = "flex-start",
  direction = "row",
  padding = "1em",
  borderRadius = "4px",
  shadowXY = [0, 2],
  shadowBlur = 4,
  shadowColor = "rgba(0, 0, 0, 0.25)",
}) {
  return (
    <StyledCard
      width={width}
      height={height}
      justify={justify}
      alignItems={alignItems}
      direction={direction}
      padding={padding}
      borderRadius={borderRadius}
      shadowXY={shadowXY}
      shadowBlur={shadowBlur}
      shadowColor={shadowColor}
    >
      {children}
    </StyledCard>
  );
};
