// src/screens/home/HomeScreen.tsx
import React, { useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { YStack, XStack, Text, Tabs, H2, ScrollView, Button } from 'tamagui';
import { Code, Palette, Layout, Zap } from '@tamagui/lucide-icons';

import { useThemeStore, selectIsDarkMode } from '../../store/zustand';
import { Card } from '../../components/ui';
import TamaguiShowcase from '../../components/examples/TamaguiShowcase';
import TodoExample from '../../components/examples/TodoExample';
import ThemeExampleComponent from '../../components/common/ThemeExampleComponent';
import ModalExample from '../../components/examples/ModalExample';
import ComponentsExample from '../../components/examples/ComponentsExample';
import FontTest from '../../components/FontTest';

const HomeScreen: React.FC = () => {
  const isDarkMode = useThemeStore(selectIsDarkMode);
  const [activeTab, setActiveTab] = useState('showcase');

  const tabs = [
    {
      key: 'showcase',
      title: 'Design System',
      icon: <Palette size="$1" />,
      description: 'Complete Tamagui component showcase',
      component: TamaguiShowcase,
    },
    {
      key: 'components',
      title: 'Components',
      icon: <Layout size="$1" />,
      description: 'Interactive component examples',
      component: ComponentsExample,
    },
    {
      key: 'theme',
      title: 'Theme Demo',
      icon: <Zap size="$1" />,
      description: 'Theme switching and colors',
      component: ThemeExampleComponent,
    },
    {
      key: 'todo',
      title: 'Todo App',
      icon: <Code size="$1" />,
      description: 'Example todo application',
      component: TodoExample,
    },
    {
      key: 'modal',
      title: 'Modals',
      icon: <Layout size="$1" />,
      description: 'Modal and dialog examples',
      component: ModalExample,
    },
    {
      key: 'fonts',
      title: 'Font Test',
      icon: <Code size="$1" />,
      description: 'Typography and font testing',
      component: FontTest,
    },
  ];

  const activeTabData = tabs.find(tab => tab.key === activeTab);
  const ActiveComponent = activeTabData?.component || TamaguiShowcase;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000000' : '#FFFFFF'}
      />

      <YStack flex={1} backgroundColor="$background">
        {/* Header Section */}
        <YStack
          padding="$lg"
          backgroundColor="$background"
          borderBottomWidth={1}
          borderBottomColor="$borderColor"
        >
          <H2 color="$color" marginBottom="$sm">
            React Native + Tamagui
          </H2>
          <Text color="$textMuted" fontSize="$md">
            Modern UI library with complete design system
          </Text>
        </YStack>

        {/* Tab Navigation */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          backgroundColor="$background"
          borderBottomWidth={1}
          borderBottomColor="$borderColor"
        >
          <XStack padding="$md" space="$sm">
            {tabs.map((tab) => (
              <Button
                key={tab.key}
                size="$3"
                variant={activeTab === tab.key ? 'outlined' : 'ghost'}
                backgroundColor={activeTab === tab.key ? '$primary' : 'transparent'}
                color={activeTab === tab.key ? 'white' : '$color'}
                borderColor={activeTab === tab.key ? '$primary' : '$borderColor'}
                borderWidth={1}
                borderRadius="$md"
                paddingHorizontal="$md"
                onPress={() => setActiveTab(tab.key)}
                icon={tab.icon}
                iconAfter={false}
                space="$2"
              >
                {tab.title}
              </Button>
            ))}
          </XStack>
        </ScrollView>

        {/* Tab Description */}
        {activeTabData && (
          <YStack
            paddingHorizontal="$lg"
            paddingVertical="$md"
            backgroundColor="$secondary"
            borderBottomWidth={1}
            borderBottomColor="$borderColor"
          >
            <XStack alignItems="center" space="$sm">
              {activeTabData.icon}
              <YStack>
                <Text fontWeight="600" color="$color">
                  {activeTabData.title}
                </Text>
                <Text fontSize="$sm" color="$textMuted">
                  {activeTabData.description}
                </Text>
              </YStack>
            </XStack>
          </YStack>
        )}

        {/* Content Area */}
        <YStack flex={1} backgroundColor="$background">
          <ActiveComponent />
        </YStack>

        {/* Quick Stats Footer */}
        <XStack
          padding="$md"
          backgroundColor="$background"
          borderTopWidth={1}
          borderTopColor="$borderColor"
          justifyContent="space-around"
        >
          <YStack alignItems="center" space="$1">
            <Text fontSize="$lg" fontWeight="bold" color="$primary">
              9
            </Text>
            <Text fontSize="$xs" color="$textMuted">
              Sections
            </Text>
          </YStack>

          <YStack alignItems="center" space="$1">
            <Text fontSize="$lg" fontWeight="bold" color="$success">
              50+
            </Text>
            <Text fontSize="$xs" color="$textMuted">
              Components
            </Text>
          </YStack>

          <YStack alignItems="center" space="$1">
            <Text fontSize="$lg" fontWeight="bold" color="$warning">
              100+
            </Text>
            <Text fontSize="$xs" color="$textMuted">
              Examples
            </Text>
          </YStack>

          <YStack alignItems="center" space="$1">
            <Text fontSize="$lg" fontWeight="bold" color="$info">
              TypeScript
            </Text>
            <Text fontSize="$xs" color="$textMuted">
              Support
            </Text>
          </YStack>
        </XStack>
      </YStack>
    </SafeAreaView>
  );
};

export default HomeScreen;
