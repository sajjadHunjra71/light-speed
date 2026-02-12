import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  // Base colors
  primary: '#0A1DA8',
  secondary: '#8A8989',

  // Standard colors
  black: '#1E1F20',
  white: '#FFFFFF',

  // Gray variants
  lightGray: '#676969',
  lightGray2: '#F6F6F7',
  lightGray3: '#EFEFF1',
  lightGray4: '#F8F8F9',
  darkGray: '#898C95',

  transparent: 'transparent',
} as const;

export const SIZES = {
  // Global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // Font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // App dimensions
  width,
  height,
} as const;
