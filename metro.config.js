// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
    resolver: {
        alias: {
            // Ensure Tamagui resolves correctly
            'react-native-svg': require.resolve('react-native-svg'),
        },
        // Add support for more file extensions
        sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json', 'cjs', 'mjs'],
    },
    transformer: {
        // Improve performance for Tamagui
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
        // Add minification options
        minifierConfig: {
            mangle: {
                keep_fnames: true,
            },
        },
    },
    watchFolders: [
        // Add node_modules to watch folders for better HMR
        path.resolve(__dirname, 'node_modules'),
    ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
