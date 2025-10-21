import { color } from "@hisius/ui/theme/colors";
import { subtleSlideAnim } from "../../../../assets/animations";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: relative;
  min-height: 100%;
  flex-direction: column;
  gap: 1rem;
`;

export const HourContainer = styled.div`
  width: 100%;
  min-height: 45%;
  display: flex;
  justify-content: space-between;
  ${subtleSlideAnim}

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const PeakContainer = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 5px;
  background-color: ${color.front};
  ${subtleSlideAnim}
`;

export const GraphContainer = styled.div`
  width: 100%;
  min-height: 300px;
  place-items: center;
`;

export const GraphHourContainer = styled.div`
  width: 48%;
  background-color: ${color.front};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;

  @media (max-width: 968px) {
    width: 100%;
  }
`;

export const GraphTitle = styled.h2`
  font-size: 14px;
  font-weight: 200;
`;
