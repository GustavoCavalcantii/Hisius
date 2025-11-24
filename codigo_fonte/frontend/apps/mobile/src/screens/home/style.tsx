import styled from "styled-components/native";
import { CodeInputBase } from "../../components/codeInput";
import { GlobalText } from "../../components/globalText";
import { scale } from "../../utils/scale";
import { color } from "@hisius/ui/theme/colors";

export const Container = styled.View`
  flex: 1;
  background-color: ${color.background};
  align-items: center;
  padding: 40px 20px;
  gap: 40px;
`;

export const ContentContainer = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  height: 100%;
  gap: 5rem;
`;

export const HeaderContainer = styled.View`
  align-items: center;
  margin-top: 40px;
`;

export const Title = styled(GlobalText)`
  font-size: ${scale(20)};
  font-weight: 600;
  margin-bottom: 8px;
`;

export const Subtitle = styled(GlobalText)`
  font-size: ${scale(14)};
  text-align: center;
`;

export const CodeContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  gap: 12px;
  margin: 20px 0;
`;

export const CodeInput = styled(CodeInputBase)`
  width: 50px;
  height: 60px;
  border-radius: 12px;
  border: 2px solid ${color.gray};
  color: ${color.text};
  background: ${color.card};
  font-size: ${scale(20)};
  text-align: center;
  font-family: "Montserrat";
  font-weight: 500;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  margin-top: 20px;
`;
