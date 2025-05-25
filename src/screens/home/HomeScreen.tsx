// src/screens/home/HomeScreen.tsx - Fixed ScrollView Issues
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Dimensions } from 'react-native';
import {
  YStack,
  XStack,
  Text,
  H1,
  H2,
  ScrollView,
  Button,
  Card,
  Separator,
  Circle,
  useTheme
} from 'tamagui';
import {
  Code,
  Palette,
  Layout,
  Zap,
  Smartphone,
  Star,
  ArrowRight
} from '@tamagui/lucide-icons';

import { useThemeStore, selectIsDarkMode } from '../../store/zustand';
import TamaguiShowcase from '../../components/examples/TamaguiShowcase';
import TodoExample from '../../components/examples/TodoExample';
import ThemeExampleComponent from '../../components/common/ThemeExampleComponent';
import ModalExample from '../../components/examples/ModalExample';
import ComponentsExample from '../../components/examples/ComponentsExample';
import FontTest from '../../components/FontTest';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const isDarkMode = useThemeStore(selectIsDarkMode);
  const { toggleTheme } = useThemeStore();
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('fonts'); // Default to fonts for testing

  const tabs = [
    {
      key: 'showcase',
      title: 'Design System',
      icon: <Palette size="$1" />,
      description: 'Complete Tamagui component showcase',
      component: TamaguiShowcase,
      color: '$primary',
    },
    {
      key: 'components',
      title: 'Components',
      icon: <Layout size="$1" />,
      description: 'Interactive component examples',
      component: ComponentsExample,
      color: '$success',
    },
    {
      key: 'theme',
      title: 'Theme Demo',
      icon: <Zap size="$1" />,
      description: 'Theme switching and colors',
      component: ThemeExampleComponent,
      color: '$warning',
    },
    {
      key: 'todo',
      title: 'Todo App',
      icon: <Code size="$1" />,
      description: 'Example todo application',
      component: TodoExample,
      color: '$info',
    },
    {
      key: 'modal',
      title: 'Modals',
      icon: <Smartphone size="$1" />,
      description: 'Modal and dialog examples',
      component: ModalExample,
      color: '$error',
    },
    {
      key: 'fonts',
      title: 'Font Test',
      icon: <Star size="$1" />,
      description: 'Typography and font testing',
      component: FontTest,
      color: '$primary',
    },
  ];

  const activeTabData = tabs.find(tab => tab.key === activeTab);
  const ActiveComponent = activeTabData?.component || FontTest;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background.val as string}
      />

      {/* Main Container - Single ScrollView */}
      <ScrollView
        flex={1}
        backgroundColor="$background"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: screenHeight,
          paddingBottom: 20
        }}
      >
        {/* Enhanced Header */}
        <YStack
          paddingTop="$lg"
          paddingHorizontal="$lg"
          paddingBottom="$md"
          backgroundColor="$background"
        >
          {/* Main Title */}
          <XStack alignItems="center" justifyContent="space-between" marginBottom="$md">
            <YStack flex={1}>
              <H1
                color="$color"
                fontSize="$2xl"
                fontWeight="bold"
                marginBottom="$xs"
              >
                React Native + Tamagui
              </H1>
              <Text color="$textMuted" fontSize="$md">
                Modern UI library with complete design system
              </Text>
            </YStack>

            {/* Theme Toggle */}
            <Button
              size="$4"
              circular
              variant="outline"
              onPress={toggleTheme}
              icon={isDarkMode ? <Zap color="$warning" /> : <Zap color="$primary" />}
            />
          </XStack>

          {/* Stats Cards */}
          <XStack space="$sm" marginTop="$md">
            <Card flex={1} padding="$sm" backgroundColor="$card">
              <YStack alignItems="center" space="$xs">
                <Text fontSize="$xl" fontWeight="bold" color="$primary">
                  6
                </Text>
                <Text fontSize="$xs" color="$textMuted">
                  Sections
                </Text>
              </YStack>
            </Card>

            <Card flex={1} padding="$sm" backgroundColor="$card">
              <YStack alignItems="center" space="$xs">
                <Text fontSize="$xl" fontWeight="bold" color="$success">
                  50+
                </Text>
                <Text fontSize="$xs" color="$textMuted">
                  Components
                </Text>
              </YStack>
            </Card>

            <Card flex={1} padding="$sm" backgroundColor="$card">
              <YStack alignItems="center" space="$xs">
                <Text fontSize="$xl" fontWeight="bold" color="$warning">
                  100+
                </Text>
                <Text fontSize="$xs" color="$textMuted">
                  Examples
                </Text>
              </YStack>
            </Card>

            <Card flex={1} padding="$sm" backgroundColor="$card">
              <YStack alignItems="center" space="$xs">
                <Text fontSize="$sm" fontWeight="bold" color="$info">
                  TS
                </Text>
                <Text fontSize="$xs" color="$textMuted">
                  Support
                </Text>
              </YStack>
            </Card>
          </XStack>
        </YStack>

        <Separator marginVertical="$sm" />

        {/* Tab Grid Navigation */}
        <YStack paddingHorizontal="$lg" marginBottom="$md">
          <H2 marginBottom="$md" color="$color">
            Explore Components
          </H2>

          <YStack space="$sm">
            {/* First Row */}
            <XStack space="$sm">
              {tabs.slice(0, 2).map((tab) => (
                <Card
                  key={tab.key}
                  flex={1}
                  padding="$md"
                  backgroundColor={activeTab === tab.key ? '$secondary' : '$card'}
                  borderColor={activeTab === tab.key ? '$primary' : '$borderColor'}
                  borderWidth={activeTab === tab.key ? 2 : 1}
                  pressStyle={{ scale: 0.98 }}
                  onPress={() => setActiveTab(tab.key)}
                >
                  <YStack space="$sm">
                    <XStack alignItems="center" justifyContent="space-between">
                      <Circle
                        size="$4"
                        backgroundColor={tab.color}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {React.cloneElement(tab.icon, { color: 'white', size: '$1.5' })}
                      </Circle>
                      {activeTab === tab.key && (
                        <ArrowRight size="$1" color="$primary" />
                      )}
                    </XStack>

                    <YStack>
                      <Text
                        fontWeight="600"
                        color="$color"
                        fontSize="$md"
                        marginBottom="$xs"
                      >
                        {tab.title}
                      </Text>
                      <Text
                        fontSize="$sm"
                        color="$textMuted"
                        lineHeight="$sm"
                        numberOfLines={2}
                      >
                        {tab.description}
                      </Text>
                    </YStack>
                  </YStack>
                </Card>
              ))}
            </XStack>

            {/* Second Row */}
            <XStack space="$sm">
              {tabs.slice(2, 4).map((tab) => (
                <Card
                  key={tab.key}
                  flex={1}
                  padding="$md"
                  backgroundColor={activeTab === tab.key ? '$secondary' : '$card'}
                  borderColor={activeTab === tab.key ? '$primary' : '$borderColor'}
                  borderWidth={activeTab === tab.key ? 2 : 1}
                  pressStyle={{ scale: 0.98 }}
                  onPress={() => setActiveTab(tab.key)}
                >
                  <YStack space="$sm">
                    <XStack alignItems="center" justifyContent="space-between">
                      <Circle
                        size="$4"
                        backgroundColor={tab.color}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {React.cloneElement(tab.icon, { color: 'white', size: '$1.5' })}
                      </Circle>
                      {activeTab === tab.key && (
                        <ArrowRight size="$1" color="$primary" />
                      )}
                    </XStack>

                    <YStack>
                      <Text
                        fontWeight="600"
                        color="$color"
                        fontSize="$md"
                        marginBottom="$xs"
                      >
                        {tab.title}
                      </Text>
                      <Text
                        fontSize="$sm"
                        color="$textMuted"
                        lineHeight="$sm"
                        numberOfLines={2}
                      >
                        {tab.description}
                      </Text>
                    </YStack>
                  </YStack>
                </Card>
              ))}
            </XStack>

            {/* Third Row */}
            <XStack space="$sm">
              {tabs.slice(4, 6).map((tab) => (
                <Card
                  key={tab.key}
                  flex={1}
                  padding="$md"
                  backgroundColor={activeTab === tab.key ? '$secondary' : '$card'}
                  borderColor={activeTab === tab.key ? '$primary' : '$borderColor'}
                  borderWidth={activeTab === tab.key ? 2 : 1}
                  pressStyle={{ scale: 0.98 }}
                  onPress={() => setActiveTab(tab.key)}
                >
                  <YStack space="$sm">
                    <XStack alignItems="center" justifyContent="space-between">
                      <Circle
                        size="$4"
                        backgroundColor={tab.color}
                        alignItems="center"
                        justifyContent="center"
                      >
                        {React.cloneElement(tab.icon, { color: 'white', size: '$1.5' })}
                      </Circle>
                      {activeTab === tab.key && (
                        <ArrowRight size="$1" color="$primary" />
                      )}
                    </XStack>

                    <YStack>
                      <Text
                        fontWeight="600"
                        color="$color"
                        fontSize="$md"
                        marginBottom="$xs"
                      >
                        {tab.title}
                      </Text>
                      <Text
                        fontSize="$sm"
                        color="$textMuted"
                        lineHeight="$sm"
                        numberOfLines={2}
                      >
                        {tab.description}
                      </Text>
                    </YStack>
                  </YStack>
                </Card>
              ))}
            </XStack>
          </YStack>
        </YStack>

        <Separator marginVertical="$sm" />

        {/* Active Tab Indicator */}
        {activeTabData && (
          <YStack
            paddingHorizontal="$lg"
            paddingVertical="$md"
            backgroundColor="$backgroundHover"
            marginBottom="$md"
          >
            <XStack alignItems="center" space="$md">
              <Circle
                size="$3"
                backgroundColor={activeTabData.color}
                alignItems="center"
                justifyContent="center"
              >
                {React.cloneElement(activeTabData.icon, { color: 'white', size: '$1' })}
              </Circle>

              <YStack flex={1}>
                <Text fontWeight="600" color="$color" fontSize="$lg">
                  {activeTabData.title}
                </Text>
                <Text fontSize="$sm" color="$textMuted">
                  {activeTabData.description}
                </Text>
              </YStack>

              <Text fontSize="$xs" color="$primary" fontWeight="500">
                ACTIVE
              </Text>
            </XStack>
          </YStack>
        )}

        {/* Content Area - NO NESTED SCROLLVIEW */}
        <YStack paddingHorizontal="$lg" paddingBottom="$lg">
          <ActiveComponent />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
