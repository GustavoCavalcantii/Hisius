import styled from "styled-components/native";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { GlobalText } from "../../components/globalText";
import { color } from "@hisius/ui/theme/colors";

export const Container = styled(ScrollView)`
  flex: 1;
  background-color: ${color.background};
  padding: 24px;
`;

export const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
  padding-top: 16px;
`;

export const BackButton = styled(TouchableOpacity)`
  margin-right: 20px;
  padding: 8px;
  background-color: ${color.front};
  border-radius: 12px;
`;

export const TitleBox = styled(View)`
  flex: 1;
`;

export const Title = styled(GlobalText)`
  font-size: 28px;
  font-weight: 700;
  color: ${color.text};
  letter-spacing: -0.5px;
`;

export const Subtitle = styled(GlobalText)`
  font-size: 16px;
  font-weight: 400;
  color: ${color.text};
  margin-bottom: 4px;
`;

export const FormContainer = styled(View)`
  gap: 32px;
`;

export const Section = styled(View)`
  gap: 16px;
`;

export const SectionTitle = styled(GlobalText)`
  font-size: 18px;
  font-weight: 600;
  color: ${color.text};
  margin-bottom: 8px;
  padding-left: 12px;
  border-left-width: 3px;
  border-left-color: ${color.primary};
`;

export const InputGroup = styled(View)`
  width: 100%;
`;

export const InputRow = styled(View)`
  flex-direction: row;
  gap: 16px;
`;

export const InputColumn = styled(View)`
  flex: 1;
`;

export const ActionsContainer = styled(View)`
  margin-top: 40px;
  gap: 24px;
`;

export const SecurityActions = styled(View)`
  gap: 12px;
`;

export const SecurityItem = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${color.front};
  border-radius: 12px;
  border: 1px solid ${color.gray};
`;

export const SecurityIcon = styled(View)`
  margin-right: 12px;
`;

export const SecurityTextContainer = styled(View)`
  flex: 1;
`;

export const SecurityTitle = styled(GlobalText)`
  font-size: 16px;
  font-weight: 600;
  color: ${color.text};
  margin-bottom: 2px;
`;

export const SecurityDescription = styled(GlobalText)`
  font-size: 14px;
  color: ${color.text};
`;