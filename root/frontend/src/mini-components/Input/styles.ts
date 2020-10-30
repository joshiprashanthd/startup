import styled from "styled-components";

export const StyledInput = styled.input<{
  padding: string;
  margin: string;
  backgroundColor: string;
  borderRadius: string;
}>`
  width: 100%;
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  border: none;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ borderRadius }) => borderRadius};
  outline: none;
  font-size: 14px;

  &:focus {
    box-shadow: 0 0pt 4pt rgba(0, 0, 0, 0.25);
  }
`;
