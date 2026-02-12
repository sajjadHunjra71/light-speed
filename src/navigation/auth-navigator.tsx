import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ForgotPasswordScreen from '../screens/auth/forgot-password-screen';
import LoginScreen from '../screens/auth/login-screen';
import SignupScreen from '../screens/auth/signup-screen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
