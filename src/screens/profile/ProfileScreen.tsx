// src/screens/profile/ProfileScreen.tsx
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { YStack, XStack, Text, View, Circle } from 'tamagui';
import { AlertTriangle } from '@tamagui/lucide-icons';

import { useAuthStore, useThemeStore, selectIsDarkMode } from '../../store/zustand';
import { Button, Card, List, Switch } from '../../components/ui';
import { toastService } from '../../components/ui';

const ProfileScreen: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { user, logout } = useAuthStore();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toastService.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toastService.error('Logout failed');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#0A0D24' : '#FFFFFF'}
      />
      <ScrollView style={{ flex: 1 }}>
        <YStack padding="$lg" space="$lg">
          <YStack alignItems="center" marginVertical="$lg">
            <Circle
              backgroundColor="$primary"
              size={80}
              marginBottom="$md"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="white" fontSize="$3xl" fontWeight="bold">
                {user?.username?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            </Circle>
            <Text fontSize="$xl" fontWeight="bold" marginBottom="$xs">
              {user?.username || 'User'}
            </Text>
            <Text fontSize="$md" color="$textMuted">
              {user?.email || 'user@example.com'}
            </Text>
          </YStack>

          <YStack space="$lg">
            <List.Root header="Account Settings">
              <List.Item
                title="Dark Mode"
                right={<Switch checked={isDarkMode} onValueChange={toggleTheme} />}
              />
              <List.Item
                title="Edit Profile"
                arrow
                onPress={() => toastService.info('Edit Profile pressed')}
              />
              <List.Item
                title="Change Password"
                arrow
                onPress={() => toastService.info('Change Password pressed')}
              />
              <List.Item
                title="Notifications"
                arrow
                onPress={() => toastService.info('Notifications pressed')}
              />
            </List.Root>

            <List.Root header="App Information">
              <List.Item
                title="About"
                arrow
                onPress={() => toastService.info('About pressed')}
              />
              <List.Item
                title="Help & Support"
                arrow
                onPress={() => toastService.info('Help & Support pressed')}
              />
              <List.Item
                title="Privacy Policy"
                arrow
                onPress={() => toastService.info('Privacy Policy pressed')}
              />
              <List.Item
                title="Terms of Service"
                arrow
                onPress={() => toastService.info('Terms of Service pressed')}
              />
            </List.Root>

            <Button
              variant="danger"
              onPress={handleLogout}
              fullWidth
            >
              Logout
            </Button>
          </YStack>
        </YStack>
      </ScrollView>

      {/* We've removed the Ant modal and will add a Tamagui modal implementation
          when needed, for simplicity not showing it here */}
    </SafeAreaView>
  );
};

export default ProfileScreen;
