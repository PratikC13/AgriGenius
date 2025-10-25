// App.js
import './firebase';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Firebase Modular SDK
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

// Screens
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import PredictYieldScreen from './screens/PredictYieldScreen';
import SuggestCropScreen from './screens/SuggestCropScreen';
import SubmitInnovationScreen from './screens/SubmitInnovationScreen';
import ViewInnovationsScreen from './screens/ViewInnovationsScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Prevent flashing wrong screen

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log('User signed out'))
      .catch((error) => console.error('Sign out error:', error));
  };

  if (loading) return null; // Optional: show splash/loading indicator

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} onSignOut={handleSignOut} />}
        </Stack.Screen>
        <Stack.Screen name="PredictYield" component={PredictYieldScreen} />
        <Stack.Screen name="SuggestCrop" component={SuggestCropScreen} />
        <Stack.Screen name="SubmitInnovation" component={SubmitInnovationScreen} />
        <Stack.Screen name="ViewInnovations" component={ViewInnovationsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
