/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { createTamagui } from 'tamagui';
import tamaguiConfig from './src/tamagui.config';
import App from './App';
import { name as appName } from './app.json';

// Set environment variables
process.env.TAMAGUI_TARGET = 'native';

// Initialize Tamagui before rendering the app
createTamagui(tamaguiConfig);

AppRegistry.registerComponent(appName, () => App);
