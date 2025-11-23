import { color } from "@hisius/ui/theme/colors";
import { clickAnim } from "../../../../../../assets/animations";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 729px;
  min-height: 100px;
  background-color: ${color.front};
  border-radius: 5px;
  border-left: 2px solid;
  border-color: ${color.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 22px 20px;
  position: relative;
  gap: 0.4rem;
  transform-origin: top center;
  transition: all 0.3s ease;
  z-index: 1;

  cursor: pointer;

  &:hover {
    transform: scale(1.005);
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.05);
  }
  z-index: 1;

  ${clickAnim}
`;

export const SelectContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 13px;
  font-weight: 400;
`;

export const SelectedCardContainer = styled.div`
  min-width: 40%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  overflow: hidden;
  transform-origin: top;
`;

export const TitleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
`;

export const NameTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  transition: all 0.3s ease;
  position: absolute;
`;

export const Description = styled.p`
  font-size: 13px;
  font-weight: 300;
  transition: all 0.3s ease;
`;
