import { color } from "@hisius/ui/theme/colors";
import styled, { css } from "styled-components";
import { ManchesterTriage } from "@hisius/enums";
import {
  contractAnimationAnim,
  expandAnimationAnim,
  tabAnim,
} from "../../../../../../assets/animations";

interface TextProps {
  type?: ManchesterTriage;
}

interface MutableProps {
  $isSelected?: boolean;
}

const mapColors: Record<ManchesterTriage, string> = {
  [ManchesterTriage.Emergency]: color.triage.emergency,
  [ManchesterTriage.VeryUrgent]: color.triage.veryUrgent,
  [ManchesterTriage.Urgent]: color.triage.urgent,
  [ManchesterTriage.Standard]: color.triage.standard,
  [ManchesterTriage.NonUrgent]: color.triage.nonUrgent,
} as const;

const getTriageColor = (type?: ManchesterTriage): string => {
  if (!type) return color.triage.emergency;
  return mapColors[type] || color.triage.emergency;
};

export const PatientInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
  margin-top: 12px;
  border-radius: 4px;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const InfoLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #6c757d;
  text-transform: uppercase;
`;

export const InfoValue = styled.span`
  font-size: 0.875rem;
  color: #495057;
  font-weight: 500;
`;

export const Container = styled.div<TextProps & MutableProps>`
  width: 100%;
  min-height: 100px;
  background-color: ${color.front};
  border-radius: 5px;
  border-left: 2px solid ${(props) => getTriageColor(props.type)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  position: relative;
  gap: 0.4rem;
  cursor: pointer;
  transform-origin: top center;
  transition: all 0.3s ease;
  ${(props: MutableProps) =>
    props.$isSelected ? expandAnimationAnim : contractAnimationAnim};

  &:hover {
    transform: scale(1.005);
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.05);
  }

  z-index: 1;

  @media (max-width: 768px) {
    min-height: 90px;
    padding: 0.8rem;
    gap: 0.3rem;
  }

  @media (max-width: 480px) {
    min-height: 80px;
    padding: 0.6rem;
    gap: 0.2rem;

    ${(props: MutableProps) =>
      props.$isSelected ? `padding: 1rem 0.5rem;` : `padding: 0.6rem;`};

    &:hover {
      transform: none;
    }
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 13px;
  font-weight: 400;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.8rem;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    font-size: 11px;
    justify-content: space-between;
  }
`;

export const TriageBadge = styled.span<TextProps>`
  color: ${(props) => getTriageColor(props.type)};
  font-size: 13px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

export const SelectedCardContainer = styled.div`
  min-width: 40%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  overflow: hidden;
  transform-origin: top;

  @media (max-width: 1024px) {
    min-width: 50%;
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    min-width: 60%;
    padding: 1rem;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    min-width: 100%;
    padding: 0.8rem;
    gap: 0.8rem;
  }
`;

export const TitleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 30px;

  @media (max-width: 768px) {
    height: 26px;
  }

  @media (max-width: 480px) {
    height: 24px;
  }
`;

export const NameTitle = styled.h1<MutableProps>`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  transition: all 0.3s ease;
  position: absolute;
  left: ${(props: MutableProps) => (props.$isSelected ? "50%" : "0")};
  transform: ${(props: MutableProps) =>
    props.$isSelected ? "translateX(-50%)" : "translateX(0)"};

  ${(props: MutableProps) =>
    !props.$isSelected &&
    css`
      ${Container}:hover & {
        ${tabAnim}
      }
    `}

  @media (max-width: 768px) {
    font-size: 15px;
    left: ${(props: MutableProps) => (props.$isSelected ? "50%" : "0")};
    transform: ${(props: MutableProps) =>
      props.$isSelected ? "translateX(-50%)" : "translateX(0)"};
  }

  @media (max-width: 480px) {
    font-size: 14px;
    position: static;
    transform: none;
    text-align: ${(props: MutableProps) =>
      props.$isSelected ? "center" : "left"};
    margin-bottom: 0.2rem;

    ${(props: MutableProps) =>
      !props.$isSelected &&
      css`
        ${Container}:hover & {
          animation: none;
        }
      `}
  }
`;

export const Description = styled.p`
  font-size: 13px;
  font-weight: 200;
  transition: all 0.3s ease;
  line-height: 1.4;

  ${Container}:hover & {
    ${tabAnim}
    color: #555;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 1.3;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    line-height: 1.2;

    ${Container}:hover & {
      animation: none;
    }
  }
`;
