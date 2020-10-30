import { emit } from "process";
import styled from "styled-components";

export const StyledText = styled.span<{
  fontSize: number;
  fontWeight: number;
  fontColor: string;
}>`
  font-size: ${({ fontSize }) => fontSize}em;
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ fontColor }) => fontColor};
`;
