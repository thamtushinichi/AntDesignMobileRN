
// src/components/layout/Header.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  showBack?: boolean;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
}

const Header: React.FC<HeaderProps> = ({
                                         title,
                                         leftIcon,
                                         rightIcon,
                                         onLeftPress,
                                         onRightPress,
                                         showBack = false,
                                         containerStyle,
                                         titleStyle,
                                       }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleBackPress = () => {
    if (onLeftPress) {
      onLeftPress();
    } else {
      navigation.goBack();
    }
  };

  const headerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: theme.metrics.spacing.md,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  };

  const titleTextStyle: TextStyle = {
    fontFamily: theme.fonts.family.medium,
    fontSize: theme.fonts.sizes.lg,
    color: theme.colors.text,
  };

  return (
    <View style={[headerStyle, containerStyle]}>
      <View style={{ width: 40, alignItems: 'flex-start' }}>
        {showBack ? (
          <TouchableOpacity onPress={handleBackPress}>
            {/* Replace with your back icon component */}
            <Text>←</Text>
          </TouchableOpacity>
        ) : leftIcon ? (
          <TouchableOpacity onPress={onLeftPress}>
            {leftIcon}
          </TouchableOpacity>
        ) : null}
      </View>

      <Text numberOfLines={1} style={[titleTextStyle, titleStyle]}>
        {title}
      </Text>

      <View style={{ width: 40, alignItems: 'flex-end' }}>
        {rightIcon ? (
          <TouchableOpacity onPress={onRightPress}>
            {rightIcon}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default Header;
