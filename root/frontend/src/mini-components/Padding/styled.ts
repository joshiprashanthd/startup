import styled from "styled-components";

export const StyledPadding = styled.div<{ padding: string }>`
  width: 100%;
  padding: ${({ padding }) => padding};
`;
