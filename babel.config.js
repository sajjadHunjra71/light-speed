const path = require('path');

module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        'babel-preset-expo',
        {
          jsxImportSource: 'nativewind',
        },
      ],
      'nativewind/babel',
    ],

    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
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
            'tailwind.config': path.resolve(__dirname, 'tailwind.config.js'),
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
