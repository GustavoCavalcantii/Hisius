import styled from "styled-components/native";

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const PopupContainer = styled.View`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

export const InputsContainer = styled.View`
  margin-bottom: 20px;
`;

export const ButtonContainer = styled.View`
  margin-top: 10px;
`;

export const GenderFieldContainer = styled.View`
  position: relative;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const GenderInputButton = styled.TouchableOpacity<{ active?: boolean }>`
  background-color: white;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${props => props.active ? '#007AFF' : '#ddd'};
  padding: 15px;
  height: 50px;
  justify-content: center;
`;

export const GenderInputContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const GenderText = styled.Text<{ selected: boolean }>`
  font-size: 16px;
  color: ${props => props.selected ? '#000' : '#999'};
`;

export const GenderOptionsContainer = styled.View`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 8px;
  border-width: 1px;
  border-color: #ddd;
  margin-top: 4px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const GenderOption = styled.TouchableOpacity<{ first?: boolean; last?: boolean }>`
  padding: 15px;
  border-bottom-width: ${props => props.last ? 0 : 1}px;
  border-bottom-color: #f0f0f0;
  ${props => props.first && `
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  `}
  
  ${props => props.last && `
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  `}
`;

export const GenderOptionText = styled.Text`
  font-size: 16px;
  color: #333;
`;