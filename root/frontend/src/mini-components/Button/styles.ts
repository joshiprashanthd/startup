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
  hoverColor: string;
  activeColor: string;
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
  cursor: pointer;
  transition: ${({ transition }) => transition};

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }

  &:active {
    background-color: ${({ activeColor }) => activeColor};
  }
`;
