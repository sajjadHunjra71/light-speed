import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { COLORS } from '../constants/theme';
import ChangePasswordScreen from '../screens/auth/change-password-screen';
import HomeScreen from '../screens/home-screen';

const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.secondary,
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen 
        name="Change Password" 
        component={ChangePasswordScreen} 
        options={{ title: 'Change Password' }}
      />
    </Drawer.Navigator>
  );
}
