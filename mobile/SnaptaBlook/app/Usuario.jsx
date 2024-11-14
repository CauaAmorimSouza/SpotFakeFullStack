// app/Usuario.jsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter, Link, router } from 'expo-router';

const UsuarioScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      
      {/* Exemplo de foto de perfil */}
      <View style={styles.profileImageWrapper}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/100' }} // Substitua pelo caminho da imagem de perfil do usuário
          style={styles.profileImage}
        />
      </View>

      {/* Informações do usuário */}
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>Nome: Cauã Souza</Text>
        <Text style={styles.userInfoText}>Email: cauaamosouza@gmail.com</Text>
        {/* Outras informações de perfil podem ser adicionadas aqui */}
      </View>

      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    color: '#00FFEA',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#00FFEA',
    overflow: 'hidden',
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  userInfo: {
    marginVertical: 20,
  },
  userInfoText: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 5,
  },
  backButton: {
    backgroundColor: '#00FFEA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  backButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default UsuarioScreen;
