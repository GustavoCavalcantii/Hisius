import { color } from "@hisius/ui/theme/colors";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding-vertical: 60px;
`;

export const LogoContainer = styled.View`
  align-items: center;
  margin-top: 150px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #0d1321;
  letter-spacing: 2px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: #333;
  margin-top: 8px;
`;

export const IllustrationContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 30px;
`;

export const Illustration = styled.Image`
  width: 90%;
  height: 200px;
  resize-mode: contain;
`;
