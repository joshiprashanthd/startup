import styled from "styled-components";

export const StyledButton = styled.button<{
  padding: string;
  margin: string;
  borderRadius: string;
  backgroundColor: string;
  fontColor: string;
  disabled: boolean;
  disabledFontColor: string;
  disabledBackgroundColor: string;
  hoverBackgroundColor: string;
  activeBackgroundColor: string;
  transition: string;
}>`
  border: none;
  width: 100%;
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: ${({
    disabled,
    disabledBackgroundColor,
    backgroundColor,
  }) => (disabled ? disabledBackgroundColor : backgroundColor)};
  color: ${({ disabled, disabledFontColor, fontColor }) =>
    disabled ? disabledFontColor : fontColor};
  outline: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: ${({ transition }) => transition};

  &:hover {
    background-color: ${({ hoverBackgroundColor }) => hoverBackgroundColor};
  }

  &:active {
    background-color: ${({ activeBackgroundColor }) => activeBackgroundColor};
  }
`;
