import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { ButtonText, Container, ProfileButton, SoftwareName } from "./styles";

interface HeaderProps {
  softwareName: string;
  onProfilePress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ softwareName, onProfilePress }) => {
  return (
    <Container>
      <SoftwareName>{softwareName}</SoftwareName>
      <ProfileButton onPress={onProfilePress}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="user" size={14} color="#000" style={{ marginRight: 6 }} />
          <ButtonText>Perfil</ButtonText>
        </View>
      </ProfileButton>
    </Container>
  );
};

export default Header;
