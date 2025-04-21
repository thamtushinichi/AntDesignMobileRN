/**
 * AntDesignMobileRN App
 *
 * @format
 */

import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Provider as AntProvider } from '@ant-design/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider, useTheme } from './src/store/context/ThemeContext';
import { AuthProvider } from './src/store/context/AuthContext';

// Themed App component that consumes the theme context
const ThemedApp = () => {
  // Get theme from context - now it's already the complete theme
  const { theme } = useTheme();

  return (
    <AntProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AntProvider>
  );
};

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <ThemedApp />
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
