import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import firebase from 'firebase/compat';

const LoginScreen = ({ navigation }) => {
    // States to manage email, password, loading state, and error message
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to handle the login process
    const handleLogin = async () => {
        setLoading(true);

        try {
            // Attempt to sign in using email and password
            await firebase.auth().signInWithEmailAndPassword(email, password);

            // User successfully logged in, navigate to the main app (Home)
            navigation.navigate('Home');
        } catch (error) {
            setError('Login failed. Please check your email and password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View className='pt-5'>
                <Image
                    source={require('../assets/icon.png')}
                    style={{ width: 150, height: 150, marginBottom: 20 }}
                />
            </View>
            <Text style={styles.title}>Login</Text>

            {/* Input fields for email and password */}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {/* Login button */}
            <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.buttonStyle}>Login</Text>
            </TouchableOpacity>

            {/* Display error message if login fails */}
            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}

            {/* Loading indicator displayed as a modal */}
            <Portal>
                <Modal visible={loading} dismissable={false} contentContainerStyle={styles.modalContainer}>
                    <ActivityIndicator size="large" color="#00CCBB" />
                </Modal>
            </Portal>
        </KeyboardAvoidingView>
    );
};

// Styles defined using StyleSheet.create
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    buttonStyle: {
        backgroundColor: '#00CCBB',
        padding: 15,
        width: 200,
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default LoginScreen;
