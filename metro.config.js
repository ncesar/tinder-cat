const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  ...config.resolver.alias,
  'crypto': 'react-native-crypto',
};

config.resolver.sourceExts = [...config.resolver.sourceExts, 'mjs'];

module.exports = config;