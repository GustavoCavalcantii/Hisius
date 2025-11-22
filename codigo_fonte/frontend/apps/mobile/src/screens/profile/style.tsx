import styled from 'styled-components/native';
import { GlobalText } from "../../components/globalText";
import { color } from 'packages/ui/theme/colors';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #f3f3f3;
  padding: 24px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-right: 12px;
`;

export const TitleBox = styled.View`
  margin-top: 10px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #000;
`;

export const Subtitle = styled.Text`
  font-size: 22px;
  font-weight: 300;
  color: #000;
`;

export const InputWrapper = styled.View`
  width: 100%;
  margin-top: 16px;
`;

export const SaveButton = styled.TouchableOpacity`
  width: 60%;
  height: 46px;
  background-color: #2f4a8a;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: 40px;
`;

export const SaveText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

export const ButtonContainer = styled.View`
  margin-top: 70px;
`;

export const LogoutText = styled(GlobalText)`
  color: ${color.error.error};
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
`;