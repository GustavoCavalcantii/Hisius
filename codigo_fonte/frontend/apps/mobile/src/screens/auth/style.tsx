import { color } from "@hisius/ui/theme/colors";
import styled from "styled-components/native";
import { GlobalText } from "../../components/globalText";

export const Container = styled.View`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  height: 100%;
  background-color: ${color.background};
`;

export const Title = styled(GlobalText)`
  font-size: 32px;
  letter-spacing: 0.5rem;
  text-align: center;
  margin: 80px 0;
  font-weight: 700;
`;

export const TabContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 24px;
  gap: 40px;
`;

export const TabButton = styled.TouchableOpacity<{ active: boolean }>`
  align-items: center;
  width: 30%;
  padding-bottom: 8px;
`;

export const TabText = styled(GlobalText)`
  font-size: 18px;
`;

export const ActiveBar = styled.View`
  width: 100%;
  height: 3px;
  background-color: ${color.secondary};
  border-radius: 2px;
  margin-top: 4px;
`;

export const InputContainer = styled.View`
  width: 100%;
  gap: 16px;
  margin-bottom: 24px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  background-color: ${color.secondary};
  padding: 14px;
  border-radius: 8px;
  align-items: center;
`;

export const ButtonText = styled(GlobalText)`
  font-size: 18px;
  font-weight: bold;
`;
