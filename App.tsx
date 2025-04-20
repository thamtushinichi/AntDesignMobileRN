/**
 * AntDesignMobileRN App
 *
 * @format
 */

import React from 'react';
import {AppRegistry, StyleSheet} from 'react-native';
import {Provider as AntProvider} from '@ant-design/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import {ThemeProvider} from './src/store/context/ThemeContext';
import {AuthProvider} from './src/store/context/AuthContext';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <AntProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </AntProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
