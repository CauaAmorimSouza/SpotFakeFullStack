import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca para ícones (Instale com 'expo install @expo/vector-icons')
import { router } from 'expo-router';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Logo e barra de busca */}
      <View style={styles.header}>
        <Image 
          source={require('./Img/SNAPTABLOOK.png')} // Substitua pelo caminho da sua logo
          style={styles.logo}
        />
        <TextInput 
          style={styles.searchBar}
          placeholder="Qual música você gostaria de ouvir?"
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Galeria de Imagens */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.galleryContainer}
      >
        {/* Substitua as URLs das imagens conforme necessário */}
        <View style={styles.imageWrapper}>
          <Image source={{ uri: 'https://midias.correiobraziliense.com.br/_midias/jpg/2024/09/23/1200x801/1_o_que_eminem_escreveu_sobre_p__diddy_em_novo_album-40168737.jpg?20240923133148?20240923133148' }} style={styles.galleryImage} />
        </View>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiZUB8X7bLGPC9asbTvkGADZFz35EJz034XA&s' }} style={styles.galleryImage} />
        </View>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: 'data:image/jpeg;base64,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' }} style={styles.galleryImage} />
        </View>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: 'data:image/jpeg;base64,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' }} style={styles.galleryImage} />
        </View>
      </ScrollView>

      {/* Lista de músicas */}
      <ScrollView contentContainerStyle={styles.musicList}>
        {['Música 1', 'Música 2', 'Música 3', 'Música 4'].map((musica, index) => (
          <TouchableOpacity key={index} style={styles.musicItem}>
            <Text style={styles.menuIcon}>≡</Text>
            <Text style={styles.musicText}>{musica}</Text>
          </TouchableOpacity>
          
        ))}
      </ScrollView>
      
    {/* Botão circular com ícone de pessoa */}
    <TouchableOpacity style={styles.profileButton} onPress={() => router.push('/Usuario')}>
        <Ionicons name="person-circle" size={50} color="#00FFEA" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderColor: '#00FFEA',
    borderWidth: 1,
  },
  galleryContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#00FFEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  galleryImage: {
    width: 90,
    height: 90,
    borderRadius: 45, // Círculo
  },
  musicList: {
    paddingBottom: 20,
  },
  musicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#00FFEA',
    borderWidth: 1,
  },
  menuIcon: {
    color: '#fff',
    fontSize: 20,
    marginRight: 15,
  },
  musicText: {
    color: '#fff',
    fontSize: 16,
  },
  profileButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 25,
    padding: 5,
  },
});

export default HomeScreen;
