import { color } from "@hisius/ui/theme/colors";
import styled, { css, keyframes } from "styled-components";
import { ManchesterTriage } from "@hisius/enums";

interface TextProps {
  type?: ManchesterTriage;
}

interface MutableProps {
  isSelected: boolean;
}

const mapColors: Record<ManchesterTriage, string> = {
  [ManchesterTriage.Emergency]: color.triage.emergency,
  [ManchesterTriage.VeryUrgent]: color.triage.veryUrgent,
  [ManchesterTriage.Urgent]: color.triage.urgent,
  [ManchesterTriage.Standard]: color.triage.standard,
  [ManchesterTriage.NonUrgent]: color.triage.nonUrgent,
} as const;

const expandAnimation = keyframes`
  0% { 
    transform: scaleY(0.8);
    opacity: 0.7;
    max-height: 80px;
  }
  100% { 
    transform: scaleY(1);
    opacity: 1;
    max-height: 1000px;
  }
`;

const contractAnimation = keyframes`
  0% { 
    transform: scaleY(1);
    opacity: 1;
    max-height: 1000px;
  }
  100% { 
    transform: scaleY(0.98);
    opacity: 0.9;
    max-height: 80px;
  }
`;

export const Container = styled.div<TextProps & MutableProps>`
  width: 100%;
  min-height: 100px;
  background-color: ${color.front};
  border-radius: 5px;
  border-left: 2px solid
    ${(props: TextProps) => {
      const type = props.type || ManchesterTriage.Emergency;
      return mapColors[type as ManchesterTriage];
    }};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 22px 20px;
  position: relative;
  gap: 0.4rem;
  cursor: pointer;
  transform-origin: top center;
  transition: all 0.3s ease;
  animation: ${(props: MutableProps) =>
      props.isSelected ? expandAnimation : contractAnimation}
    0.4s ease forwards;

  &:hover {
    transform: scale(1.005);
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.05);
  }
  z-index: 1;
`;

export const SelectContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 13px;
  font-weight: 400;
`;

export const TriageBadge = styled.span<TextProps>`
  color: ${(props: TextProps) => {
    const type = props.type || ManchesterTriage.Emergency;
    return mapColors[type as ManchesterTriage];
  }};
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

export const NameTitle = styled.h1<MutableProps>`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  transition: all 0.3s ease;
  position: absolute;
  left: ${(props: MutableProps) => (props.isSelected ? "50%" : "0")};
  transform: ${(props: MutableProps) =>
    props.isSelected ? "translateX(-50%)" : "translateX(0)"};

  ${(props: MutableProps) =>
    !props.isSelected &&
    css`
      ${Container}:hover & {
        transform: translateX(5px);
        color: ${color.primary};
      }
    `}
`;

export const Description = styled.p`
  font-size: 13px;
  font-weight: 200;
  transition: all 0.3s ease;

  ${Container}:hover & {
    color: #555;
    transform: translateX(5px);
    font-weight: 400;
  }
`;
