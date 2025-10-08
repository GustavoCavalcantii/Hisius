import React, { useEffect } from 'react';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, LogoContainer, Title, Subtitle, IllustrationContainer, Illustration } from './style';

export default function SplashScreen() {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    // Animação de fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      // Após 2.5 segundos, navega para a próxima tela (ex: Login)
      setTimeout(() => navigation.navigate('Login' as never), 1000);
    });
  }, []);

  return (
    <Container>
      <Animated.View style={{ opacity: fadeAnim }}>
        <LogoContainer>
          <Title>HISIUS</Title>
          <Subtitle>Pronto para agilizar o seu atendimento?</Subtitle>
        </LogoContainer>

        <IllustrationContainer>
          <Illustration source={require('../../assets/hisius-illustration.png')} />
        </IllustrationContainer>
      </Animated.View>
    </Container>
  );
}