import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Animated } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';

// Background and logo images
//const backgroundImage = { uri: 'https://i.ibb.co/1LKwFL7/farmer-bg.jpg' }; // Replace with your own URL
const logo = require('../assets/agrigenius_logo.png'); // Save your uploaded logo image in the assets folder

export default function ProfileScreen({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;

  const [fadeAnim] = React.useState(new Animated.Value(0)); // For fade-in effect

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigation.replace('Login'))
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  };

  React.useEffect(() => {
    // Trigger the fade-in animation when the component is mounted
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        {/* Updated back button, matching the previous style */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={40} color="#2e7d32" />
        </TouchableOpacity>

        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Your Profile</Text>
        
        {/* Fade-in profile info */}
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
          {user ? (
            <>
              <View style={styles.infoRow}>
                <Ionicons name="person-circle" size={24} color="#2e7d32" />
                <Text style={styles.info}>Name: {user.displayName || 'Not set'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="mail" size={24} color="#2e7d32" />
                <Text style={styles.info}>Email: {user.email}</Text>
              </View>
            </>
          ) : (
            <Text style={styles.info}>You are not logged in.</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Light overlay for better text visibility
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2e7d32',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginTop: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  info: {
    fontSize: 18,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
