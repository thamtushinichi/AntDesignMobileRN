// src/navigation/AppNavigator.tsx
import React from 'react';
import { YStack, Spinner } from 'tamagui';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthStore, selectIsAuthenticated, selectAuthLoading } from '../store/zustand';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  // Use the auth state from Zustand store
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isLoading = useAuthStore(selectAuthLoading);

  if (isLoading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" color="$primary" />
      </YStack>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
