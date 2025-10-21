import styled from "styled-components";
import type { PopupOverlayProps, PopupContainerProps } from "./types";
import {
  clickAnim,
  fadeInAnim,
  subtleSlideAnim,
} from "../../assets/animations";

export const PopupOverlay = styled.div<PopupOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: ${({ position }) =>
    position === "top"
      ? "flex-start"
      : position === "bottom"
        ? "flex-end"
        : "center"};
  padding: ${({ position }) =>
    position === "top" ? "20px" : position === "bottom" ? "20px" : "0"};
  z-index: 1000;
  ${fadeInAnim}
`;

export const PopupContainer = styled.div<PopupContainerProps>`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  ${subtleSlideAnim}

  ${({ size }) => {
    switch (size) {
      case "small":
        return `
          width: 400px;
          max-width: 90vw;
        `;
      case "large":
        return `
          width: 800px;
          max-width: 90vw;
        `;
      case "fullscreen":
        return `
          width: 95vw;
          height: 95vh;
        `;
      default:
        return `
          width: 600px;
          max-width: 90vw;
        `;
    }
  }}
`;

export const PopupHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 1rem;
`;

export const PopupTitle = styled.h2`
  width: 100%;
  text-align: center;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;

  cursor: pointer;
  padding: 0;

  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${clickAnim}
`;

export const PopupContent = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`;
