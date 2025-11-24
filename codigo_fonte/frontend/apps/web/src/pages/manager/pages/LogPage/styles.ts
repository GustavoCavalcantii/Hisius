import styled from "styled-components";

export const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  margin-top: 30px;
  gap: 1rem;
`;

export const SheetValue = styled.div`
  background-color: white;
  box-shadow: 0px 2px 2px #00000010;
  padding: 20px;
  border-radius: 5px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 1rem;
  margin-top: 8px;
  padding: 16px;
  border-bottom: 0.7px solid #0000003b;
`;

export const RowValues = styled.div`
  font-weight: 300;
  padding: 0 15px;
  font-size: 14px;
`;

export const Container = styled.div`
  padding: 20px;
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 20px;
  font-style: italic;
  color: #666;
`;

export const NoDataText = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;
