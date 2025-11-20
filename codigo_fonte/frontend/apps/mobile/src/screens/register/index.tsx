import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import Input from '../../../../../packages/ui/components/CustomInput';
import Button from '../../../../../packages/ui/components/Button';
import * as S from './style'

import { Register as AuthServiceRegister } from '../../../../../packages/services/src/Auth';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    try {
      setLoading(true);
      const data = await AuthServiceRegister({ name, email, password });
      console.log('Token recebido:', data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar o registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={S.Container}>
      <Text style={S.Title}>HISIUS</Text>

      <View style={S.TabContainer}>
        <Text style={S.TabText}>Entrar</Text>
        <Text style={[S.TabText, S.TabActive]}>Registrar</Text>
      </View>

      <View style={S.InputContainer}>
        <Input
          placeholder="Nome de usuário"
          value={name}
          onChangeText={setName}
      
        />

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

        <Input
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry

        />
      </View>

      <TouchableOpacity
        style={S.Button}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={S.ButtonText}>Entrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

