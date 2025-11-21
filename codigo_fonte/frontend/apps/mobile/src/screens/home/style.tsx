import styled from "styled-components/native";
import { CodeInputBase } from "../../components/codeInput";
import { GlobalText } from "../../components/globalText";
import { scale } from "../../utils/scale";
import { color } from "@hisius/ui/theme/colors";

export const Container = styled.View`
  flex: 1;
  background-color: #f8f8f8;
  align-items: center;

  gap: 5rem;
  padding: 20px;
`;

export const Title = styled(GlobalText)`
  font-size: ${scale(18)};
  font-weight: 500;
  margin-bottom: 1.5rem;
  margin-top: 8rem;
`;

export const Subtitle = styled(GlobalText)`
  font-size: ${scale(12)};
  color: ${color.text};
  margin-bottom: 40px;
  text-align: center;
`;

export const ButtonContainer = styled.View`
  margin-top: 30px;
  width: 60%;
`;

export const CodeContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 30px;
`;

export const CodeInput = styled(CodeInputBase).attrs({
  placeholderTextColor: color.gray,
  selectionHandleColor: color.secondary,
})`
  font-family: "Montserrat";
  width: 45px;
  height: 50px;
  border-width: 1px;
  border-color: ${color.gray};
  border-radius: 6px;
  text-align: center;
  font-size: ${scale(18)};
  margin: 0 5px;
  background-color: ${color.card};
`;

/*
export const SeparatorContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Line = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${color.text};
`;


export const OrText = styled(GlobalText)`
  margin: 0 10px;
`;

export const QrButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #f2f8ff;
  border-width: 1px;
  border-color: #bfd5f9;
  border-radius: 8px;
  padding: 0.5rem 1rem;
`;

export const QrText = styled.Text`
  margin-left: 8px;
  color: #0e1d47;
  font-weight: 500;
`;
*/
