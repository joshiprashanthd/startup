import styled from "styled-components";

export const StyledLink = styled.a<{
  fontSize: number | string;
  fontWeight: number;
  fontColor: string;
  lineHeight: number;
  display: string;
  margin: string;
  padding: string;
  hoverFontColor: string;
  hoverTextDecoration: string;
}>`
  display: ${({ display }) => display};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  line-height: ${({ lineHeight }) => lineHeight};
  font-size: ${({ fontSize }) => {
    if (typeof fontSize === "string") return fontSize;
    else return `${fontSize}px`;
  }};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ fontColor }) => fontColor};
  cursor: pointer;

  &:hover {
    color: ${({ hoverFontColor }) => hoverFontColor};
    text-decoration: ${({ hoverTextDecoration }) => hoverTextDecoration};
  }
`;
