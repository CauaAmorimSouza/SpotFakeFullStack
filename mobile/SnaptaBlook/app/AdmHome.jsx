// AdmHome.jsx
import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Modal, StyleSheet } from "react-native";

const AdmHome = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalData, setModalData] = useState(null);

    const allUsers = async () => {
        try {
            const response = await fetch("http://localhost:8000/usuarios/todos", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                }
            });
            const message = await response.text();

            setModalData(
                <View>
                    <Text style={styles.modalText}>
                        {message}
                    </Text>
                </View>
            );
        } catch (error) {
            console.error("Error during fetch:", error);
            alert("Erro ao buscar usuários");
        }
    };

    const dadosModal = async (botao) => {
        switch (botao) {
            case "Todos":
                await allUsers();
                setModalContent(
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Exibindo todos os usuários</Text>
                        {modalData}
                    </View>
                );
                break;
            case "Um":
                setModalContent(
                    <Text style={styles.title}>
                        Exibindo um único usuário
                    </Text>
                );
                break;
            case "Deletar":
                setModalContent(
                    <Text style={styles.title}>
                        Deletando usuário
                    </Text>
                );
                break;
            default:
                setModalContent(null);
                break;
        }
        setModalVisible(true);
    };

    return (
        <ScrollView style={styles.scrollview}>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <ScrollView style={styles.modal_scrollview}>
                    <View style={styles.modal_container}>
                        {modalContent}
                        <Pressable style={styles.button} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </Modal>

            <View style={styles.container}>
                <Text style={styles.title}>Hub dos Admins</Text>
                <View style={styles.buttonContainer}>

                    <Pressable style={styles.button} onPress={() => dadosModal('Todos')}>
                        <Text style={styles.buttonText}>Todos os Usuários</Text>
                    </Pressable>

                    <Pressable style={styles.button} onPress={() => dadosModal('Um')}>
                        <Text style={styles.buttonText}>Selecionar um Usuário</Text>
                    </Pressable>

                    <Pressable style={styles.button} onPress={() => dadosModal('Deletar')}>
                        <Text style={styles.buttonText}>Deletar um Usuário</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollview: {
        flex: 1,
        backgroundColor: '#000',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#000',
    },
    title: {
        color: '#00FFEA',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#00FFEA',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
        width: '80%',
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modal_scrollview: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modal_container: {
        backgroundColor: '#333',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        borderColor: '#00FFEA',
        borderWidth: 2,
    },
    modalContent: {
        marginBottom: 20,
    },
    modalText: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 5,
    },
});

export default AdmHome;
