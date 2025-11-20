import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #d3d3d3;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #0b0b25;
  margin-bottom: 40px;
  letter-spacing: 2px;
`;

export const TabContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
  margin-bottom: 20px;
`;

export const TabText = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const TabActive = styled.View`
  border-bottom-width: 2px;
  border-bottom-color: #2a73c2;
  padding-bottom: 4px;
`;

export const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 25px;
`;

export const Input = styled.TextInput`
  background-color: #e8ebf0;
  border-radius: 8px;
  padding: 12px 15px;
  font-size: 16px;
  color: #000;
  margin-bottom: 12px;
  elevation: 1;

  /* Sombras no iOS */
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-offset: 0px 2px;
  shadow-radius: 3px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #0b1e57;
  border-radius: 6px;
  padding-vertical: 14px;
  align-items: center;
  width: 100%;
  margin-bottom: 60px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;
