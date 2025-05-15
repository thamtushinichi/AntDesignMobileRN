// src/navigation/MainNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, User } from '@tamagui/lucide-icons';
import { useTheme } from 'tamagui';

import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { useThemeStore, selectIsDarkMode } from '../store/zustand';

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator = () => {
  const isDarkMode = useThemeStore(selectIsDarkMode);
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary.val as string,
        tabBarInactiveTintColor: theme.textMuted.val as string,
        tabBarStyle: {
          backgroundColor: theme.background.val as string,
          borderTopColor: theme.borderColor.val as string,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
