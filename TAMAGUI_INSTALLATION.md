# Tamagui Installation Instructions

This document provides detailed instructions for installing and configuring Tamagui in a React Native project.

## Installation

1. **Install Tamagui and its dependencies**:

```bash
pnpm add tamagui @tamagui/animations-react-native @tamagui/babel-plugin @tamagui/config @tamagui/font-inter @tamagui/react-native-media-driver @tamagui/shorthands @tamagui/themes @tamagui/lucide-icons react-native-reanimated react-native-svg
```

2. **Install development dependencies**:

```bash
pnpm add -D babel-plugin-transform-inline-environment-variables
```

3. **Configure Babel**:

Update your `babel.config.js`:

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      '@tamagui/babel-plugin',
      {
        components: ['tamagui'],
        config: './src/tamagui.config.ts',
        importsWhitelist: ['constants.js', 'colors.js'],
        logTimings: true,
        disableExtraction: process.env.NODE_ENV === 'development',
      },
    ],
    [
      'transform-inline-environment-variables',
      {
        include: 'TAMAGUI_TARGET',
      },
    ],
    'react-native-reanimated/plugin', // Make sure this is last
  ],
};
```

4. **Configure Metro**:

Update your `metro.config.js`:

```javascript
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-tamagui-transformer'),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

5. **Create Tamagui configuration**:

Create a file at `src/tamagui.config.ts`:

```typescript
import { createTamagui } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'
import { createAnimations } from '@tamagui/animations-react-native'

// Define custom themes, tokens, animations, etc.

// Create and export the Tamagui config
const tamaguiConfig = createTamagui({
  // Configuration options here
});

// Export the config and types
export type AppConfig = typeof tamaguiConfig
export default tamaguiConfig

// Export the theme types
declare module 'tamagui' {
  interface ThemeTokens extends AppConfig['themes']['light'] {}
}
```

6. **Update `index.js`**:

In your `index.js` file, set the environment variable:

```javascript
process.env.TAMAGUI_TARGET = 'native';
```

7. **Setup TamaguiProvider**:

In your `App.tsx` (or wherever your app root is defined):

```tsx
import { TamaguiProvider, Theme } from 'tamagui';
import config from './src/tamagui.config';

function App() {
  return (
    
      
        {/* Your app content */}
      
    
  );
}
```

## Troubleshooting

### Common Issues

1. **Babel configuration errors**:
    - Make sure you have all the required Babel plugins installed and properly configured
    - Double-check that your paths to the Tamagui config are correct

2. **Metro configuration errors**:
    - Ensure you're using the correct path to the Tamagui transformer
    - Verify your Metro config is properly merged with the default config

3. **Theme related errors**:
    - Check that your theme tokens are properly defined in your Tamagui config
    - Verify you're using the theme properties correctly in your components

4. **Reanimated issues**:
    - Make sure the Reanimated plugin is at the end of your Babel plugins array
    - Check that you have the latest version of Reanimated installed

### Tips

- Always restart Metro after making changes to your Babel or Metro configuration
- Clean your project (clear cache, remove build folders) when making significant configuration changes
- Check the Tamagui documentation for the latest installation instructions as they may change with new releases

## Additional Resources

- [Tamagui Official Documentation](https://tamagui.dev/docs/intro/installation)
- [React Native Reanimated Documentation](https://docs.swmansion.com/react-native-reanimated/)
- [React Native SVG Documentation](https://github.com/react-native-svg/react-native-svg)
