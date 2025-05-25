// src/screens/home/HomeScreen.tsx
import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { YStack, XStack, Text, View, Tabs, Separator } from 'tamagui';

import { useThemeStore, selectIsDarkMode } from '../../store/zustand';
import { Card } from '../../components/ui';
import TodoExample from '../../components/examples/TodoExample';
import ThemeExampleComponent from '../../components/common/ThemeExampleComponent';
import ModalExample from '../../components/examples/ModalExample';
import ComponentsExample from '../../components/examples/ComponentsExample';
import FontTest from '../../components/FontTest.tsx';

const HomeScreen: React.FC = () => {
  const isDarkMode = useThemeStore(selectIsDarkMode);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <YStack padding="$lg" space="$lg">
          <Card
            title="Tamagui Examples"
            subtitle="Modern React Native UI Library"
          >
            <Text color="$color" padding="$sm">
              These examples showcase Tamagui components and styling capabilities.
              Browse through the tabs to see different implementations.
            </Text>
          </Card>

          <Tabs
            defaultValue="components"
            orientation="horizontal"
            flexDirection="column"
            borderRadius="$lg"
            backgroundColor="$background"
            borderColor="$borderColor"
            borderWidth={1}
            overflow="hidden"
          >
            <Tabs.List
              backgroundColor="$background"
              borderBottomColor="$borderColor"
              borderBottomWidth={1}
              paddingHorizontal="$md"
            >
              <Tabs.Tab flex={1} value="components">
                <Text>Components</Text>
              </Tabs.Tab>
              <Tabs.Tab flex={1} value="theme">
                <Text>Theme</Text>
              </Tabs.Tab>
              <Tabs.Tab flex={1} value="todo">
                <Text>Todo</Text>
              </Tabs.Tab>
              <Tabs.Tab flex={1} value="modal">
                <Text>Modal</Text>
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Content value="components">
              <ComponentsExample />
            </Tabs.Content>

            <Tabs.Content value="theme">
              <ThemeExampleComponent />
            </Tabs.Content>

            <Tabs.Content value="todo">
              <TodoExample />
            </Tabs.Content>

            <Tabs.Content value="modal">
              <ModalExample />
            </Tabs.Content>
          </Tabs>
          <FontTest />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

