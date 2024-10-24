// app/Index.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

const InicialScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>SNAPTABLOOK</Text>
        {/* Logo aumentada */}
        <Image 
          source={require('./Img/SNAPTABLOOK.png')} 
          style={styles.image} 
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/Login')}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: 200, // Aumentando a largura da imagem
    height: 200, // Aumentando a altura da imagem
    marginBottom: 20,
    borderColor: '#00FFEA',
    borderWidth: 2,
    borderRadius: 100, // Ajustando para a nova largura
  },
  title: {
    color: '#00FFEA',
    fontSize: 28, 
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 60, 
  },
  button: {
    backgroundColor: '#00FFEA',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default InicialScreen;
