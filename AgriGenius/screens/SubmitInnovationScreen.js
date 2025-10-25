import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ScrollView, Image, ImageBackground, Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const backgroundImage = require('../assets/background_agrigenius.png');
const logo = require('../assets/agrigenius_logo.png');

export default function SubmitInnovationScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0)); // for fade-in effect

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !author.trim()) {
      Alert.alert('❗ Please fill in all fields properly');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.6:5000/submit_idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, author }),
      });

      const result = await response.json();
      console.log('Submit response:', result);

      if (response.ok) {
        Alert.alert('✅ Success', result.message || 'Idea submitted successfully!');
        setTitle('');
        setDescription('');
        setAuthor('');
      } else {
        Alert.alert('❌ Error', result.message || 'Failed to submit idea.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('❌ Error', 'Could not submit idea');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      
      {/* 🔙 Back Arrow */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.overlay}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.header}>🚀 Share Your Innovative Idea</Text>

        <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
          <TextInput
            style={styles.input}
            placeholder="Idea Title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#9E9E9E"
          />
        </Animated.View>

        <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
          <TextInput
            style={[styles.input, { height: 120 }]}
            placeholder="Describe your idea..."
            value={description}
            onChangeText={setDescription}
            multiline
            placeholderTextColor="#9E9E9E"
          />
        </Animated.View>

        <Animated.View style={[styles.inputContainer, { opacity: fadeAnim }]}>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={author}
            onChangeText={setAuthor}
            placeholderTextColor="#9E9E9E"
          />
        </Animated.View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>📤 Submit Idea</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flexGrow: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 25,
    justifyContent: 'center',
  },
  backArrow: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 100,
    padding: 6,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#388E3C',
    textAlign: 'center',
    marginBottom: 25,
    fontFamily: 'Poppins',
  },
  inputContainer: {
    marginBottom: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#BDBDBD',
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: '500',
    color: '#424242',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    backgroundColor: '#388E3C',
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#388E3C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
});
