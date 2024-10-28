// app/Cadastro.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const registrarUsuario = async (nome, sobrenome, email, senha, dataNascimento, router) => {
  if (!nome || !sobrenome || !email || !senha || !dataNascimento) {
    Alert.alert('Erro', 'Todos os campos devem estar preenchidos');
    return;
  }

  try {
    const resposta = await fetch('http://localhost:8000/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      body: JSON.stringify({
        nome,
        sobrenome,
        email,
        senha,
        dataNascimento,
      }),
    });

    if (resposta.status === 200) {
      Alert.alert('Sucesso', 'Usuário criado com sucesso');
      router.push('/Login'); // Navegar para a tela de login após sucesso
    } else {
      Alert.alert('Erro', 'Ocorreu um erro ao criar o usuário');
    }
  } catch (error) {
    Alert.alert('Erro', 'Falha na comunicação com o servidor');
    console.error('Erro na requisição:', error);
  }
};

const CadastroScreen = () => {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/Login')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar para Login</Text>
      </TouchableOpacity>
      <Text style={styles.title}>CADASTRE-SE</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>CADASTRO</Text>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#aaa"
          value={nome}
          onChangeText={setNome}
        />
        <Text style={styles.label}>Sobrenome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu sobrenome"
          placeholderTextColor="#aaa"
          value={sobrenome}
          onChangeText={setSobrenome}
        />
        <Text style={styles.label}>Data de Nascimento:</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          placeholderTextColor="#aaa"
          value={dataNascimento}
          onChangeText={setDataNascimento}
        />
        <Text style={styles.label}>E-mail:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <Pressable
          style={styles.button}
          onPress={() => registrarUsuario(nome, sobrenome, email, senha, dataNascimento, router)}
        >
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </Pressable>
      </View>
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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  backButtonText: {
    color: '#00FFEA',
    fontSize: 14,
  },
  title: {
    color: '#00FFEA',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    width: '80%',
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
    borderColor: '#00FFEA',
    borderWidth: 2,
  },
  formTitle: {
    color: '#00FFEA',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#555',
  },
  button: {
    backgroundColor: '#00FFEA',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CadastroScreen;
