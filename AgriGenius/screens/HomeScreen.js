import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';

// Background image and logo
const backgroundImage = require('../assets/background_agrigenius.png');
const logo = require('../assets/agrigenius_logo.png');

export default function HomeScreen({ navigation }) {
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigation.replace('Login'))  // 🔄 Redirect to Login screen after sign-out
      .catch(error => console.error('Sign out error:', error));
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Welcome to AgriGenius 🌾</Text>
        <Text style={styles.subtitle}>AI-Powered Innovation for Farmers</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PredictYield')}>
          <Text style={styles.buttonText}>🔮 Predict Yield</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SuggestCrop')}>
          <Text style={styles.buttonText}>🌱 Suggest Crop</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SubmitInnovation')}>
          <Text style={styles.buttonText}>💡 Share Innovative Ideas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViewInnovations')}>
          <Text style={styles.buttonText}>📖 View Ideas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#b22222' }]} onPress={handleSignOut}>
          <Text style={styles.buttonText}>🚪 Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#228b22',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 8,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  backgroundImage: {
  flex: 1,
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},
});
