import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Box, Icon, Pressable, Text } from '@ui-kit';
import { Menu as MenuIcon } from 'lucide-react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AuthButton } from '../components/ui/auth-button';
import { logoutApi } from '../services/auth';
import { logout } from '../store/slices/auth-slice';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(logout());
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Box className="flex-1 bg-white">
      <Box className="flex-row justify-between items-center px-5 pt-[60px] pb-5">
        <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Icon as={MenuIcon} size="xl" className="text-black" />
        </Pressable>
        <Text className="text-xl font-bold text-black">Home</Text>
        <Box className="w-6" />
      </Box>
      
      <Box className="flex-1 p-5 justify-center items-center">
        <Text className="text-2xl text-primary-500 mb-[10px] text-center">Welcome to Light Speed!</Text>
        <Text className="text-sm text-gray-500 text-center">You are now logged in.</Text>
        
        <AuthButton
          title="Logout"
          onPress={handleLogout}
          className="mt-[50px] bg-secondary-500"
        />
      </Box>
    </Box>
  );
}
