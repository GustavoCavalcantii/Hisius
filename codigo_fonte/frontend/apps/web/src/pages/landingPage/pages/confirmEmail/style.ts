import styled from "styled-components";
import { color } from "@hisius/ui/theme/colors";

export const ScreenContainer = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${color.background};
  padding: 16px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const AuthCard = styled.article`
  position: relative;
  width: 100%;
  max-width: 500px;
  background: ${color.front};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  overflow: hidden;
  padding: 48px;

  @media (max-width: 768px) {
    padding: 32px 24px;
    max-width: 100%;
  }
`;

export const AuthForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const AuthHeader = styled.header`
  text-align: center;
  margin-bottom: 16px;
`;

export const ScreenTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${color.text};
  margin-bottom: 8px;
`;

export const ScreenDescription = styled.p`
  color: ${color.text}80;
  line-height: 1.6;
  margin-bottom: 24px;
`;

export const StatusMessage = styled.div<{
  variant: "success" | "error" | "info";
}>`
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 16px;
  border: 1px solid;
  line-height: 1.5;

  ${({ variant }) => {
    switch (variant) {
      case "success":
        return `
          background: ${color.error.ok}1a;
          color: ${color.error.ok};
          border-color: ${color.error.ok}4d;
        `;
      case "error":
        return `
          background: ${color.error.error}1a;
          color: ${color.error.error};
          border-color: ${color.error.error}4d;
        `;
      case "info":
        return `
          background: ${color.primary}0d;
          color: ${color.text};
          border-color: ${color.primary}26;
        `;
      default:
        return "";
    }
  }}
`;

export const SuccessScreen = styled.section`
  text-align: center;
  padding: 24px 0;
`;

export const EmailHighlight = styled.strong`
  color: ${color.primary};
  font-weight: 600;
`;