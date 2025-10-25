import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, Image, ScrollView, ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const backgroundImage = require('../assets/background_agrigenius.png');
const logo = require('../assets/agrigenius_logo.png');

export default function SuggestCropScreen({ navigation }) {
  const [rainfall, setRainfall] = useState('');
  const [temperature, setTemperature] = useState('');
  const [soilType, setSoilType] = useState('');
  const [land, setLand] = useState('');
  const [cropResult, setCropResult] = useState(null);

  const handleSuggest = async () => {
    // Trim and validate input
    if (
      !rainfall.trim() ||
      !temperature.trim() ||
      !soilType.trim() ||
      !land.trim()
    ) {
      Alert.alert("❗ Missing Information", "Please fill in all the fields.");
      return;
    }

    try {
      const response = await fetch('http://192.168.1.6:5000/suggest-crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rainfall: rainfall.trim(),
          temperature: temperature.trim(),
          soil: soilType.trim(),
          land: land.trim(),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setCropResult(data.suggested_crop);
      } else {
        Alert.alert("❌ Error", "Something went wrong.");
      }
    } catch (err) {
      Alert.alert("🚫 Connection Error", "Could not connect to server.");
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Suggest Best Crop 🌾</Text>

        <TextInput
          style={styles.input}
          placeholder="🌧️ Enter Rainfall (mm)"
          value={rainfall}
          onChangeText={setRainfall}
          keyboardType="numeric"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="🌡️ Enter Temperature (°C)"
          value={temperature}
          onChangeText={setTemperature}
          keyboardType="numeric"
          placeholderTextColor="#666"
        />
        <TextInput
          style={styles.input}
          placeholder="🌱 Enter Soil Type"
          value={soilType}
          onChangeText={setSoilType}
          placeholderTextColor="#666"
        />
        <Text style={styles.soilExamples}>e.g. Clay, Sandy, Loamy, Red, Black</Text>

        <TextInput
          style={styles.input}
          placeholder="🌾 Enter Land Size (hectares)"
          value={land}
          onChangeText={setLand}
          keyboardType="numeric"
          placeholderTextColor="#666"
        />

        <TouchableOpacity onPress={handleSuggest} style={styles.suggestButton}>
          <Text style={styles.suggestText}>📊 Suggest Crop</Text>
        </TouchableOpacity>

        {cropResult && (
          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>🌱 Suggested Crop:</Text>
            <Text style={styles.resultCrop}>{cropResult}</Text>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 100,
    padding: 6,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 60,
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 14,
    fontSize: 16,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#bbb',
    borderWidth: 1,
  },
  soilExamples: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  suggestButton: {
    backgroundColor: '#6A994E',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
  },
  suggestText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resultBox: {
    marginTop: 30,
    backgroundColor: '#e0f2f1',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  resultLabel: {
    fontSize: 18,
    color: '#004d40',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultCrop: {
    fontSize: 20,
    color: '#1b5e20',
    fontWeight: '700',
  },
});
