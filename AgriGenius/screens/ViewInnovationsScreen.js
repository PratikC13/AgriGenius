import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet,
  ActivityIndicator, ImageBackground, Image, Animated, TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const backgroundImage = require('../assets/background_agrigenius.png');
const logo = require('../assets/agrigenius_logo.png');

export default function ViewInnovationsScreen({ navigation }) {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animation] = useState(new Animated.Value(0));

  const fetchIdeas = async () => {
    try {
      const response = await fetch('http://192.168.1.6.241:5000/get_ideas');
      const data = await response.json();
      setIdeas(data);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  const renderItem = ({ item }) => (
    <Animated.View style={[styles.card, { opacity: animation }]}>
      <TouchableOpacity style={styles.cardContent} activeOpacity={0.8}>
        <Ionicons name="bulb" size={24} color="#2e7d32" style={styles.icon} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.description}</Text>
          <Text style={styles.author}>— {item.author}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Image source={logo} style={styles.logo} />
        <Text style={styles.header}>🌟 Farmer Innovations</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#228b22" />
        ) : (
          <FlatList
            data={ideas}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
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
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 12,
    marginTop: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#388E3C',
  },
  desc: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
    marginBottom: 10,
  },
  author: {
    fontSize: 12,
    color: '#777',
    fontStyle: 'italic',
  },
  backgroundImage: {
  flex: 1,
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},
});
