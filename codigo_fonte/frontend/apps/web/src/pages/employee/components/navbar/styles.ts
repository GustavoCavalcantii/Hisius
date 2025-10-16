import { color } from "@hisius/ui/theme/colors";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 1rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const QueueContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const QueueTitle = styled.h2`
  color: ${color.text};
  font-size: 24px;
  font-weight: 400;
  margin: 0;
`;

export const QueueSubtitle = styled.h3`
  color: ${color.text};
  font-size: 13px;
  font-weight: 200;
  margin: 0;
`;
