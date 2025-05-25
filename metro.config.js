// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const config = {
    resolver: {
        alias: {
            'react-native-svg': require.resolve('react-native-svg'),
        },
        sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json', 'cjs', 'mjs'],
        assetExts: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'ttf', 'otf', 'woff', 'woff2'], // Added font extensions
    },
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
        minifierConfig: {
            mangle: {
                keep_fnames: true,
            },
        },
    },
    watchFolders: [
        path.resolve(__dirname, 'node_modules'),
    ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
