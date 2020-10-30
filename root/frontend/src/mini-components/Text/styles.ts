import { emit } from "process";
import styled from "styled-components";

export const StyledText = styled.span<{
  fontSize: number | string;
  fontWeight: number;
  fontColor: string;
}>`
  font-size: ${({ fontSize }) => {
    if (typeof fontSize === "string") return fontSize;
    else return `${fontSize}px`;
  }};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ fontColor }) => fontColor};
`;
