import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Input from '../../../../../packages/ui/components/CustomInput';
import Button from '../../../../../packages/ui/components/Button';
import * as S from './style'; 

import { Login as AuthServiceLogin } from '../../../../../packages/services/src/Auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = await AuthServiceLogin({ email, password });
      console.log('Token recebido:', data.token);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar o login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Title>HISIUS</S.Title>

      <S.TabContainer>
        <S.TabActive>
          <S.TabText>Entrar</S.TabText>
        </S.TabActive>
        <S.TabText>Registrar</S.TabText>
      </S.TabContainer>

      <S.InputContainer>
        <Input
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
      
        />

        <Input
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
      
        />
      </S.InputContainer>

      <S.Button onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <S.ButtonText>Entrar</S.ButtonText>
        )}
      </S.Button>
    </S.Container>
  );
}
