import styled from "styled-components";

export const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledRow = styled.div`
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  width: 100%;
`;

export const StyledColumn = styled.div`
  flex: 1 1 auto;
`;

export const StyledTopLeft = styled(StyledColumn)`
  width: 300px;
  flex: 0 1 auto;
`;

export const StyledBottomLeft = styled(StyledColumn)`
  width: 300px;
  flex: 0 1 auto;
`;
