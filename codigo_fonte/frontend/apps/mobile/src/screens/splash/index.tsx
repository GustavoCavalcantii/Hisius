import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";
import * as S from "./style";

export default function Splash() {

  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login' as never);
    }, 200000);

    return () => clearTimeout(timer);
  }, [navigation]); 

  return (
    <S.Container>
      <S.Title>HISIUS</S.Title>
      <S.Subtitle>Pronto para agilizar o seu atendimento</S.Subtitle>
      <S.ImageSpace>
        <S.Image source={require('../../assets/vectorArt.png')}/>
      </S.ImageSpace>
    </S.Container>
  );
}