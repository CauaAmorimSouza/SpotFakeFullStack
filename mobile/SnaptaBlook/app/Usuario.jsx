// app/Usuario.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const UsuarioScreen = () => {
  const router = useRouter();

  // Estados para senha atual e nova senha
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');

  const alterarSenha = async () => {
    if (!senhaAtual || !novaSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/autenticacao/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senhaAtual,
          novaSenha,
        }),
      });

      const data = await response.json(); // Aguarda a resposta do servidor

      console.log('Resposta do servidor:', data);

      if (response.ok) {
        Alert.alert('Sucesso', 'Senha alterada com sucesso.');
        setSenhaAtual('');
        setNovaSenha('');
      } else {
        Alert.alert('Erro', data.message || 'Não foi possível alterar a senha.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

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
      </View>

      {/* Formulário para alterar senha */}
      <View style={styles.form}>
        <Text style={styles.label}>Senha Atual</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={senhaAtual}
          onChangeText={setSenhaAtual}
          placeholder="Digite sua senha atual"
          placeholderTextColor="#777"
        />
        <Text style={styles.label}>Nova Senha</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={novaSenha}
          onChangeText={setNovaSenha}
          placeholder="Digite sua nova senha"
          placeholderTextColor="#777"
        />
        <TouchableOpacity onPress={alterarSenha} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Alterar Senha</Text>
        </TouchableOpacity>
      </View>

      {/* Botão para voltar */}
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
  form: {
    width: '100%',
    marginTop: 20,
  },
  label: {
    color: '#00FFEA',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#1c1c1c',
    color: '#fff',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#00FFEA',
  },
  saveButton: {
    backgroundColor: '#00FFEA',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
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
