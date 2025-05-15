// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
    transformer: {
        // We don't need the special transformer since we're not doing static extraction yet
        // This simplifies the setup for now
        // babelTransformerPath: require.resolve('react-native-tamagui-transformer'),
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
