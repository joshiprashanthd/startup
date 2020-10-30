import styled from "styled-components";

export const StyledCard = styled.div<{
  width: string;
  height: string;
  justify: string;
  alignItems: string;
  direction: string;
  padding: string;
  borderRadius: string;
  shadowXY: number[];
  shadowBlur: number;
  shadowColor: string;
}>`
  display: flex;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ alignItems }) => alignItems};
  border-radius: ${({ borderRadius }) => borderRadius};
  padding: ${({ padding }) => padding};
  box-shadow: ${({ shadowXY, shadowBlur, shadowColor }) =>
    `${shadowXY[0]}px ${shadowXY[1]}px ${shadowBlur}px ${shadowColor}`};
`;
