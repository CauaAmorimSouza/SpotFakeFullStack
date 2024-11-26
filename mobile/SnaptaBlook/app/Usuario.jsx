import React, { useContext, useState, useEffect } from "react";
import { View, Text, Pressable, Image, TextInput, ScrollView, Alert } from "react-native";
import { Link } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import jwtDecode from 'jwt-decode'; // Certifique-se de que o pacote está instalado
import { LoginContext } from "../scripts/LoginContext";

const Profile = () => {
    const { foto, setFoto, token, userData, setUserData } = useContext(LoginContext);

    // Garantir que o token seja válido antes de decodificá-lo
    const info = token ? jwtDecode(token) : { email: '' };

    const [formData, setFormData] = useState({ foto: '', email: info.email, senha: '' });

    const getUserData = async () => {
        try {
            const response = await fetch("http://localhost:8000/autenticacao/user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                setFoto(data.foto || 'https://placeholder.pics/svg/300');
            } else {
                console.log("Erro ao obter dados do usuário:", response.statusText);
            }
        } catch (error) {
            console.error("Erro de rede:", error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const handleImagePickerPress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setFoto(result.assets[0].uri);
            handleSendImage(result.assets[0].uri);
        }
    };

    const handleSendImage = async (imageUri) => {
        try {
            const data = {
                file: imageUri,
                upload_preset: "ml_default",
            };
            const res = await fetch('https://api.cloudinary.com/v1_1/dsoehv79q/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                const result = await res.json();
                setFormData({ ...formData, foto: result.url });
                updatePic(result.url);
            } else {
                console.log("Erro ao enviar imagem:", res.statusText);
            }
        } catch (error) {
            console.error("Erro de rede:", error);
        }
    };

    const updatePic = async (fotoUrl) => {
        try {
            const response = await fetch("http://localhost:8000/usuarios/mudar_foto", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, foto: fotoUrl }),
            });

            const message = await response.text();
            if (response.ok) {
                Alert.alert("Sucesso", message);
            } else {
                console.log("Erro ao atualizar foto:", message);
            }
        } catch (error) {
            console.error("Erro de rede:", error);
        }
    };

    const changePass = async () => {
        try {
            const response = await fetch("http://localhost:8000/pesquisa/mudar_senha", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const message = await response.text();
            if (response.ok) {
                Alert.alert("Sucesso", message);
            } else {
                console.log("Erro ao mudar senha:", message);
            }
        } catch (error) {
            console.error("Erro de rede:", error);
        }
    };

    return (
        <ScrollView>
            <View>
                <Pressable onPress={handleImagePickerPress}>
                    <Text>Foto de Perfil - Clique para Editar</Text>
                    <Image style={{ width: 100, height: 100 }} source={{ uri: foto }} />
                </Pressable>
                <Text>{`Nome Completo: ${userData.nome || ''} ${userData.sobreNome || ''}`}</Text>
                <Text>{`Status: ${userData.status || ''}`}</Text>
                <Pressable onPress={() => updatePic(foto)}>
                    <Text>Salvar Imagem</Text>
                </Pressable>
                <TextInput
                    placeholder="Nova Senha"
                    value={formData.senha}
                    onChangeText={(text) => setFormData({ ...formData, senha: text })}
                    secureTextEntry
                />
                <Pressable onPress={changePass}>
                    <Text>Mudar Senha</Text>
                </Pressable>
                <Link href="/Home">
                    <Pressable>
                        <Text>Ir para a página principal.</Text>
                    </Pressable>
                </Link>
            </View>
        </ScrollView>
    );
};

export default Profile;
