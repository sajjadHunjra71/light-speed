import { GluestackUIProvider } from '@ui-kit';
import React from 'react';
import { Provider } from 'react-redux';
import './global.css';
import AppNavigator from './src/navigation/app-navigator';
import { store } from './src/store';

export default function App() {
  return (
    <GluestackUIProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </GluestackUIProvider>
  );
}
