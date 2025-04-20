// src/components/layout/Container.tsx
import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ViewStyle,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface ContainerProps {
  children: React.ReactNode;
  scroll?: boolean;
  safeArea?: boolean;
  keyboardAvoid?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  backgroundColor?: string;
}

const Container: React.FC<ContainerProps> = ({
                                               children,
                                               scroll = false,
                                               safeArea = true,
                                               keyboardAvoid = false,
                                               style,
                                               contentContainerStyle,
                                               backgroundColor,
                                             }) => {
  const { theme, isDarkMode } = useTheme();

  const bgColor = backgroundColor || theme.colors.background;
  const barStyle = isDarkMode ? 'light-content' : 'dark-content';

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: bgColor,
  };

  const renderContent = () => {
    if (scroll) {
      return (
        <ScrollView
          style={[containerStyle, style]}
          contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      );
    }

    return (
      <View style={[containerStyle, style]}>
        {children}
      </View>
    );
  };

  const renderWithKeyboardAvoid = (content: React.ReactNode) => {
    if (keyboardAvoid) {
      return (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {content}
        </KeyboardAvoidingView>
      );
    }

    return content;
  };

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor={bgColor} />
      {safeArea ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
          {renderWithKeyboardAvoid(renderContent())}
        </SafeAreaView>
      ) : (
        renderWithKeyboardAvoid(renderContent())
      )}
    </>
  );
};

export default Container;
