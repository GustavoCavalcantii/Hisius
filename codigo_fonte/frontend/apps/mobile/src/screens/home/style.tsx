import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #f8f8f8;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #0e1d47;
  margin-bottom: 6px;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: #444;
  margin-bottom: 40px;
`;

export const ButtonContainer = styled.View`
  margin-top: 30px;
`;

export const CodeContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 30px;
`;

export const CodeInput = styled.TextInput`
  width: 45px;
  height: 50px;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 6px;
  text-align: center;
  font-size: 20px;
  margin: 0 5px;
  background-color: #fff;
`;

export const SeparatorContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Line = styled.View`
  flex: 1;
  height: 1px;
  background-color: #000;
`;

export const OrText = styled.Text`
  margin: 0 10px;
  color: #000;
`;

export const QrButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #f2f8ff;
  border-width: 1px;
  border-color: #bfd5f9;
  border-radius: 8px;
  padding: .5rem 1rem;
`;

export const QrText = styled.Text`
  margin-left: 8px;
  color: #0e1d47;
  font-weight: 500;
`;

export const EnterButton = styled.TouchableOpacity`
  margin-top: 40px;
  background-color: #2c4484;
  border-radius: 8px;
`;

export const EnterText = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 16px;
`;
