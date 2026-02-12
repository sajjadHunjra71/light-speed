const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Add alias resolution
config.resolver.alias = {
  '@': path.resolve(__dirname, 'src'),
  '@components': path.resolve(__dirname, 'src/components'),
  '@hooks': path.resolve(__dirname, 'src/hooks'),
  '@services': path.resolve(__dirname, 'src/services'),
  '@types': path.resolve(__dirname, 'src/types'),
  '@utils': path.resolve(__dirname, 'src/utils'),
  '@theme': path.resolve(__dirname, 'src/constants/theme'),
  '@ui-kit': path.resolve(__dirname, 'src/components/ui-kit.ts'),
  '@store': path.resolve(__dirname, 'src/store'),
  '@constants': path.resolve(__dirname, 'src/constants'),
  '@screens': path.resolve(__dirname, 'src/screens'),
};

// Ensure Metro uses the alias resolver
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = withNativeWind(config, { input: './global.css' });
