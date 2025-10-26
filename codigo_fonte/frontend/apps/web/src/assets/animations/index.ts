import { color } from "@hisius/ui/theme/colors";
import { css, keyframes } from "styled-components";

const subtleSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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

export const tabAnim = css`
  transform: translateX(5px);
  color: ${color.primary};
`;

export const clickAnim = css`
  &:active {
    transform: scale(0.98);
    transition: all 0.1s ease;
  }
`;

export const expandAnimationAnim = css`
  animation: ${expandAnimation} 0.4s ease forwards;
`;

export const contractAnimationAnim = css`
  animation: ${contractAnimation} 0.4s ease forwards;
`;

export const fadeInAnim = css`
  animation: ${fadeIn} 0.4s ease;
`;

export const subtleSlideAnim = css`
  animation: ${subtleSlide} 0.4s ease;
`;
