import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";

export default function Splash() {

  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login' as never);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]); 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HISIUS</Text>
      <Text style={styles.subtitle}>Pronto para agilizar o seu atendimento</Text>

      <View style={styles.imageSpace}>
        
        <Image source={require('../assets/vectorArt.png')} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  imageSpace: {
    width: '80%',
    height: 180,
    backgroundColor: '#eee',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});
