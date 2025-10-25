import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const backgroundImage = require('../assets/background_agrigenius.png');
const logo = require('../assets/agrigenius_logo.png');

export default function PredictYieldScreen({ navigation }) {
  const [rainfall, setRainfall] = useState('');
  const [temperature, setTemperature] = useState('');
  const [soilType, setSoilType] = useState('');
  const [land, setLand] = useState('');
  const [yieldResult, setYieldResult] = useState(null);

  const handlePredict = async () => {
    // Trim inputs before checking
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
      const response = await fetch('http://192.168.1.6:5000/predict', {
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
        setYieldResult(data.predicted_yield);
      } else {
        Alert.alert("❌ Error", "Something went wrong while predicting.");
      }
    } catch (err) {
      Alert.alert("🚫 Connection Error", "Could not connect to server.");
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>

        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Let's Predict Your Yield 🌾</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="rainy" size={20} color="#4CAF50" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Rainfall (mm)"
            value={rainfall}
            onChangeText={setRainfall}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="thermometer" size={20} color="#F57C00" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Temperature (°C)"
            value={temperature}
            onChangeText={setTemperature}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="shovel" size={20} color="#795548" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Soil Type (e.g. Clay, Loamy)"
            value={soilType}
            onChangeText={setSoilType}
          />
        </View>

        <Text style={styles.soilExamples}>
          Examples: Clay, Sandy, Loamy, Black, Red
        </Text>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="terrain" size={20} color="#388E3C" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Land Area (hectares)"
            value={land}
            onChangeText={setLand}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.predictButton} onPress={handlePredict}>
          <Text style={styles.predictButtonText}>🌾 Predict My Yield</Text>
        </TouchableOpacity>

        {yieldResult && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>✅ Estimated Yield: {yieldResult} tons</Text>
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
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 25,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  soilExamples: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  predictButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
  },
  predictButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  resultBox: {
    marginTop: 25,
    backgroundColor: '#e0f2f1',
    padding: 15,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    color: '#00796B',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
