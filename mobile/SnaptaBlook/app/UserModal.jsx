// UserModal.jsx
import React from "react";
import { Modal, ScrollView, View, Pressable, Text, SafeAreaView, FlatList, TextInput, StyleSheet } from "react-native";

const UserModal = ({ modalVisible, setModalVisible, modalContent }) => {
    return (
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
                        <Text style={styles.buttonText}>Fechar</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
    button: {
        backgroundColor: "#00FFEA",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default UserModal;
