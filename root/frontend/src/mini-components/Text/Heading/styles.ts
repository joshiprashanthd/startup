import styled from "styled-components";

export const StyledHeading = styled.p<{
  fontSize: number | string;
  fontWeight: number;
  fontColor: string;
  margin: string;
  padding: string;
}>`
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  font-size: ${({ fontSize }) => {
    if (typeof fontSize === "string") return fontSize;
    else return `${fontSize}em`;
  }};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ fontColor }) => fontColor};
`;
