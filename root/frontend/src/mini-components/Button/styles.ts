import styled from "styled-components";

export const StyledButton = styled.button`
  font-weight: 500;
  font-size: 10pt;
  /* text-transform: uppercase; */
  border: none;
  width: 100%;
  padding: 8pt;
  border-radius: 4pt;
  background-color: #256de8;
  color: white;
  outline: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: #1f5fcc;
  }

  &:active {
    background-color: #1a4da3;
  }
`;
