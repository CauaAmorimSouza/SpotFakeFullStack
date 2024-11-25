// AdmHome.jsx
import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Modal, StyleSheet, SafeAreaView, FlatList, Alert, TextInput } from "react-native";

const AdmHome = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    // Função para buscar todos os usuários
    const allUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:8000/pesquisa/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const message = await response.json();
            setUsuarios(message);
            setLoading(false);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            alert("Erro ao buscar usuários");
            setLoading(false);
        }
    };

    // Função para deletar um usuário
    const deleteUser = async () => {
        try {
            const response = await fetch(`http://localhost:8000/pesquisa/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email })
            });
            if (response.ok) {
                alert("Usuário deletado com sucesso!");
                setEmail("");
                setModalVisible(false);
            } else {
                alert("Erro ao deletar usuário");
            }
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            alert("Erro ao deletar usuário");
        }
    };

    // Modal de deleção de usuários
    const deletarUsuarios = async () => {
        await allUsers();
        setModalContent(
            <SafeAreaView style={styles.modalContent}>
                <Text style={styles.title}>Deletar Usuário</Text>
                {loading ? (
                    <Text style={styles.text}>Carregando...</Text>
                ) : (
                    <FlatList
                        data={usuarios}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.userCard}>
                                <Text style={styles.text}>Nome: {item.nome}</Text>
                                <Text style={styles.text}>Email: {item.email}</Text>
                                <Pressable
                                    style={styles.deleteButton}
                                    onPress={() =>
                                        Alert.alert(
                                            "Confirmação",
                                            `Deseja deletar o usuário ${item.nome}?`,
                                            [
                                                { text: "Cancelar", style: "cancel" },
                                                { text: "Deletar", onPress: () => deleteUser(item.id) },
                                            ]
                                        )
                                    }
                                >
                                    <Text style={styles.deleteButtonText}>Deletar</Text>
                                </Pressable>
                            </View>
                        )}
                    />
                )}
            </SafeAreaView>
        );
        setModalVisible(true);
    };

    const dadosModal = (botao) => {
        switch (botao) {
            case "Todos":
                allUsers();
                setModalContent(
                    <SafeAreaView style={styles.modalContent}>
                        <Text style={styles.title}>Todos os Usuários</Text>
                        <FlatList
                            data={usuarios}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.userCard}>
                                    <Text style={styles.text}>Nome: {item.nome}</Text>
                                    <Text style={styles.text}>Email: {item.email}</Text>
                                </View>
                            )}
                        />
                    </SafeAreaView>
                );
                break;
            case "Deletar":
                
                setModalContent(
                    <View style={styles.modalContent}>
                        <Text  style={styles.title}>Deletar Usuário</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o email do usuário"
                            placeholderTextColor="#ccc"
                            //defaultValue={email}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <Pressable style={styles.pressable} onPress={deleteUser}>
                            <Text style={styles.pressable_text}>Deletar</Text>
                        </Pressable>
                    </View>
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
                        {modalContent} {/* Certifique-se de que 'modalContent' não esteja sendo recriado desnecessariamente */}
                        <Pressable style={styles.button} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Fechar</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </Modal>


            <View style={styles.container}>
                <Text style={styles.title}>Hub dos Admins</Text>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={() => dadosModal("Todos")}>
                        <Text style={styles.buttonText}>Todos os Usuários</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => dadosModal("Deletar")}>
                        <Text style={styles.buttonText}>Deletar um Usuário</Text>
                    </Pressable>
                    
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    // ... outros estilos ...
    input: {
        height: 50,
        borderColor: "#00FFEA",
        borderWidth: 1,
        borderRadius: 5,
        color: "#fff",
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: "#222",
        fontSize: 16,
    },
    pressable: {
        backgroundColor: "red",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: "center",
    },
    pressable_text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    scrollview: {
        flex: 1,
        backgroundColor: "#000",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#000",
    },
    title: {
        color: "#00FFEA",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#00FFEA",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: "center",
        width: "80%",
    },
    buttonText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16,
    },
    modal_scrollview: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    modal_container: {
        backgroundColor: "#333",
        padding: 20,
        margin: 20,
        borderRadius: 10,
        borderColor: "#00FFEA",
        borderWidth: 2,
    },
    modalContent: {
        marginBottom: 20,
    },
    userCard: {
        backgroundColor: "#444",
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
        borderColor: "#00FFEA",
        borderWidth: 1,
    },
    text: {
        color: "#fff",
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    deleteButtonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default AdmHome;
