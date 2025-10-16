import { color } from "@hisius/ui/theme/colors";
import styled, { css, keyframes } from "styled-components";

interface StyledProps {
  isOn: boolean;
  position?: "left" | "right";
}

const bounceIn = keyframes`
  0% { transform: scale(0.95); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

export const Switch = styled.div<StyledProps>`
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  background: ${color.front};
  border-radius: 2.5px;
  position: relative;
  cursor: pointer;
  padding: 4px;
  border: 0.7px solid rgba(13, 19, 41, 0.12);
  overflow: hidden;
  min-width: 120px;

  &:active {
    transform: scale(0.98);
    transition: all 0.1s ease;
  }
`;

export const Slider = styled.div<StyledProps>`
  width: calc(50% - 8px);
  height: calc(100% - 8px);
  background: ${color.primary};
  border-radius: 5px;
  position: absolute;
  top: 4px;
  left: ${(props: StyledProps) => (props.isOn ? "calc(50% + 2px)" : "4px")};
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  ${(props: StyledProps) =>
    props.isOn !== undefined &&
    css`
      animation: ${bounceIn} 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `}
`;

export const Text = styled.span<StyledProps>`
  color: ${(props: StyledProps) =>
    props.position === "left"
      ? props.isOn
        ? color.text
        : color.front
      : props.isOn
        ? color.front
        : color.text};

  font-size: 14px;
  font-weight: 500;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 1;
  text-align: center;
  padding: 8px 12px;
  white-space: nowrap;
  position: relative;

  transform: ${(props: StyledProps) =>
    (props.position === "left" && !props.isOn) ||
    (props.position === "right" && props.isOn)
      ? "scale(1.05)"
      : "scale(1)"};
`;

export const LeftText = styled(Text).attrs({ position: "left" })``;
export const RightText = styled(Text).attrs({ position: "right" })``;
