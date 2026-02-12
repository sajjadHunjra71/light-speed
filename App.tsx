import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box, Center, GluestackUIProvider, Text } from '@ui-kit';
import React from 'react';
import './global.css';

// Create a simple Home Screen component
function HomeScreen() {
  return (
    <Box className="flex-1 bg-background-0">
      <Center className="flex-1">
        <Text className="text-xl font-bold text-typography-900">
          Welcome to Light Speed
        </Text>
        <Text className="text-sm mt-2 text-typography-500">
          Powered by GlueStack UI & React Navigation
        </Text>
      </Center>
    </Box>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GluestackUIProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Light Speed' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
