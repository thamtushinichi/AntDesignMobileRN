import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { Icon } from '@ant-design/react-native';
import { useTheme } from '../../store/context/ThemeContext';

export type ButtonType = 'primary' | 'secondary' | 'outline' | 'text' | 'danger' | 'success' | 'warning';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonShape = 'default' | 'rounded' | 'circle';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  type?: ButtonType;
  size?: ButtonSize;
  shape?: ButtonShape;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeOpacity?: number;
  testID?: string;
  accessibilityLabel?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
                                         title,
                                         onPress,
                                         type = 'primary',
                                         size = 'medium',
                                         shape = 'default',
                                         disabled = false,
                                         loading = false,
                                         fullWidth = false,
                                         icon,
                                         iconPosition = 'left',
                                         iconSize,
                                         style,
                                         textStyle,
                                         activeOpacity = 0.8,
                                         testID,
                                         accessibilityLabel,
                                         children,
                                       }) => {
  const { theme } = useTheme();
  const { colors, spacing, borderRadius } = theme;

  // Determine button background color based on type
  const getBackgroundColor = () => {
    if (disabled) return colors.disabled;

    switch (type) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'outline':
      case 'text':
        return 'transparent';
      case 'danger':
        return colors.error;
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      default:
        return colors.primary;
    }
  };

  // Determine button text color based on type
  const getTextColor = () => {
    if (disabled) return colors.textTertiary;

    switch (type) {
      case 'primary':
      case 'danger':
      case 'success':
      case 'warning':
        return colors.textInverted;
      case 'secondary':
        return colors.textInverted;
      case 'outline':
        switch (type) {
          case 'danger':
            return colors.error;
          case 'success':
            return colors.success;
          case 'warning':
            return colors.warning;
          default:
            return colors.primary;
        }
      case 'text':
        switch (type) {
          case 'danger':
            return colors.error;
          case 'success':
            return colors.success;
          case 'warning':
            return colors.warning;
          default:
            return colors.primary;
        }
      default:
        return colors.textInverted;
    }
  };

  // Determine button border color based on type
  const getBorderColor = () => {
    if (disabled) return colors.disabled;

    switch (type) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'outline':
        switch (type) {
          case 'danger':
            return colors.error;
          case 'success':
            return colors.success;
          case 'warning':
            return colors.warning;
          default:
            return colors.primary;
        }
      case 'text':
        return 'transparent';
      case 'danger':
        return colors.error;
      case 'success':
        return colors.success;
      case 'warning':
        return colors.warning;
      default:
        return colors.primary;
    }
  };

  // Determine border radius based on shape
  const getBorderRadius = () => {
    switch (shape) {
      case 'default':
        return borderRadius.m;
      case 'rounded':
        return borderRadius.round;
      case 'circle':
        // For circle, we'll make it half the height in the layout
        return undefined;
      default:
        return borderRadius.m;
    }
  };

  // Determine padding based on size
  const getPadding = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: spacing.xs,
          paddingHorizontal: spacing.m,
        };
      case 'medium':
        return {
          paddingVertical: spacing.s,
          paddingHorizontal: spacing.l,
        };
      case 'large':
        return {
          paddingVertical: spacing.m,
          paddingHorizontal: spacing.xl,
        };
      default:
        return {
          paddingVertical: spacing.s,
          paddingHorizontal: spacing.l,
        };
    }
  };

  // Determine text size based on button size
  const getTextSize = () => {
    switch (size) {
      case 'small':
        return theme.typography.fontSizes.s;
      case 'medium':
        return theme.typography.fontSizes.m;
      case 'large':
        return theme.typography.fontSizes.l;
      default:
        return theme.typography.fontSizes.m;
    }
  };

  // Determine icon size based on button size if not explicitly provided
  const getIconSize = () => {
    if (iconSize) return iconSize;

    switch (size) {
      case 'small':
        return 16;
      case 'medium':
        return 20;
      case 'large':
        return 24;
      default:
        return 20;
    }
  };

  // Adjust dimensions for circle shape
  const getCircleStyles = () => {
    if (shape !== 'circle') return {};

    const dimension = size === 'small' ? 32 : size === 'medium' ? 40 : 48;
    return {
      width: dimension,
      height: dimension,
      borderRadius: dimension / 2,
      padding: 0,
      justifyContent: 'center',
      alignItems: 'center',
    };
  };

  // Render the icon
  const renderIcon = () => {
    if (!icon && !loading) return null;

    if (loading) {
      return <ActivityIndicator size="small" color={getTextColor()} style={styles.iconLeft} />;
    }

    return (
      <Icon
        name={icon}
        size={getIconSize()}
        color={getTextColor()}
        style={iconPosition === 'left' ? styles.iconLeft : styles.iconRight}
      />
    );
  };

  // Determine what to render as content
  const renderContent = () => {
    if (loading && !title && !children) {
      return <ActivityIndicator size="small" color={getTextColor()} />;
    }

    if (children) {
      return children;
    }

    if (!title && icon) {
      return renderIcon();
    }

    return (
      <>
        {icon && iconPosition === 'left' && renderIcon()}
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: getTextSize(),
              fontWeight: theme.typography.fontWeights.semiBold,
            },
            textStyle,
          ]}>
          {title}
        </Text>
        {icon && iconPosition === 'right' && renderIcon()}
      </>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: type === 'outline' ? 1 : 0,
          borderRadius: getBorderRadius(),
          width: fullWidth ? '100%' : 'auto',
          ...getPadding(),
        },
        getCircleStyles(),
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={activeOpacity}
      testID={testID}
      accessibilityLabel={accessibilityLabel || title}>
      <View style={styles.contentContainer}>{renderContent()}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default Button;
