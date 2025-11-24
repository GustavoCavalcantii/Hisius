import styled from "styled-components/native";
import { TouchableOpacity, Text } from "react-native";
import { GlobalText } from "../globalText";
import { color } from "@hisius/ui/theme/colors";
import { scale } from "../../utils/scale";

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: transparent;
`;

export const SoftwareName = styled(GlobalText)`
  font-size: ${scale(25)};
  font-weight: bold;
  text-transform: uppercase;
`;

export const ProfileButton = styled(TouchableOpacity)`
  padding: 6px 12px;

  border-color: ${color.gray};
  background-color: ${color.card};

  border-radius: 15px;
  border-width: 1px;
`;

export const ButtonText = styled(GlobalText)`
  font-size: 16px;
  color: ${color.text};
`;
