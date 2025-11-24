import styled from "styled-components/native";
import { color } from "@hisius/ui/theme/colors";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0px;
  background-color: ${color.background};
`;

export const Title = styled.Text`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${color.text};
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  text-align: center;
  margin-bottom: 40px;
  color: ${color.text};
`;

export const ImageSpace = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
`;

export const Image = styled.Image`
  width: 100%;
  height: auto;
  aspect-ratio: 1.7;
  position: absolute;
  bottom: 0;
  align-self: center;
`;
