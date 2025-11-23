import { color } from "@hisius/ui/theme/colors";
import styled, { css } from "styled-components";

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${color.background};
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

export const FormsWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 100vh;
  background: ${color.front};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

export const FormContainer = styled.div<{
  position: "left" | "right";
  isActive: boolean;
}>`
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  padding: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.6s ease-in-out;
  z-index: 1;

  ${(props) =>
    props.position === "left" &&
    css`
      left: 0;
      transform: translateX(0%);
    `}

  ${(props) =>
    props.position === "right" &&
    css`
      right: 0;
      transform: translateX(0%);
    `}

  @media (max-width: 768px) {
    width: 100%;
    position: relative;
    transform: none !important;
    display: ${(props) => (props.isActive ? "flex" : "none")};
    padding: 30px 20px;
    left: auto !important;
    right: auto !important;
  }
`;

export const LoginFormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  text-align: center;
  color: ${color.text}80;
  margin-bottom: 30px;
`;

export const Footer = styled.div`
  margin-top: 25px;
  text-align: center;
`;

export const Link = styled.a`
  color: ${color.primary};
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: ${color.secondary};
    text-decoration: underline;
  }
`;

export const SignupText = styled.span`
  display: block;
  margin-top: 20px;
  color: ${color.text}80;
`;

export const TogglePanel = styled.div<{ isLogin: boolean }>`
  position: absolute;
  top: 0;
  left: ${(props) => (props.isLogin ? "50%" : "0")};
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  z-index: 2;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ToggleOverlay = styled.div`
  background: ${color.primary};
  color: white;
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
`;

export const TogglePanelContent = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
`;

export const ToggleTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: white;
`;

export const ToggleText = styled.p`
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
`;

export const ToggleButton = styled.button`
  background: transparent;
  border: 2px solid white;
  color: white;
  width: 50%;
  padding: 12px 30px;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
`;
