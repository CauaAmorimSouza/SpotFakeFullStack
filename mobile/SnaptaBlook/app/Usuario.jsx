// app/Usuario.jsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

const UsuarioScreen = () => {
  const [imageUri, setImageUri] = useState('https://via.placeholder.com/100'); // Defina a URI inicial com a imagem padrão ou a atual do usuário
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();

  // Função para selecionar nova imagem de perfil
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permissão negada', 'Você precisa dar permissão para acessar a galeria');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Mantém a proporção quadrada
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // Atualiza a imagem
      // Aqui você pode enviar a imagem para o servidor, se necessário
      // Exemplo de envio: enviarImagemParaServidor(result.assets[0].uri);
    }
  };

  // Função para atualizar a senha do usuário
  const changePassword = () => {
    if (newPassword.length < 6) {
      Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres');
      return;
    }
    // Aqui você pode enviar a nova senha para o servidor
    // Exemplo de envio: enviarSenhaParaServidor(newPassword);
    Alert.alert('Senha atualizada', 'Sua senha foi alterada com sucesso');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      
      {/* Exemplo de foto de perfil */}
      <View style={styles.profileImageWrapper}>
        <Image 
          source={{ uri: imageUri }} // Usa a URI da imagem selecionada
          style={styles.profileImage}
        />
      </View>

      {/* Botão para selecionar nova imagem */}
      <TouchableOpacity onPress={pickImage} style={styles.changeImageButton}>
        <Text style={styles.changeImageButtonText}>Trocar Imagem de Perfil</Text>
      </TouchableOpacity>

      {/* Informações do usuário */}
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>Nome: Cauã Souza</Text>
        <Text style={styles.userInfoText}>Email: cauaamosouza@gmail.com</Text>
      </View>

      {/* Campo para trocar a senha */}
      <View style={styles.passwordChangeContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Nova senha"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={changePassword} style={styles.changePasswordButton}>
          <Text style={styles.changePasswordButtonText}>Alterar Senha</Text>
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
  changeImageButton: {
    backgroundColor: '#00FFEA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  changeImageButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  userInfo: {
    marginVertical: 20,
  },
  userInfoText: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 5,
  },
  passwordChangeContainer: {
    marginVertical: 20,
    width: '100%',
  },
  passwordInput: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    color: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  changePasswordButton: {
    backgroundColor: '#00FFEA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  changePasswordButtonText: {
    color: '#000',
    fontWeight: 'bold',
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
