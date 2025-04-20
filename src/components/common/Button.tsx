import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {useTheme} from '../../store/context/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
                                         title,
                                         onPress,
                                         type = 'primary',
                                         size = 'medium',
                                         disabled = false,
                                         loading = false,
                                         fullWidth = false,
                                         style,
                                         textStyle,
                                       }) => {
  const {colors} = useTheme();

  // Determine button background color based on type
  const getBackgroundColor = () => {
    if (disabled) return '#d9d9d9';

    switch (type) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return 'transparent';
      case 'outline':
        return 'transparent';
      case 'danger':
        return colors.error;
      default:
        return colors.primary;
    }
  };

  // Determine button text color based on type
  const getTextColor = () => {
    if (disabled) return '#999999';

    switch (type) {
      case 'primary':
        return '#ffffff';
      case 'secondary':
        return colors.primary;
      case 'outline':
        return colors.primary;
      case 'danger':
        return '#ffffff';
      default:
        return '#ffffff';
    }
  };

  // Determine button border based on type
  const getBorderColor = () => {
    if (disabled) return '#d9d9d9';

    switch (type) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return 'transparent';
      case 'outline':
        return colors.primary;
      case 'danger':
        return colors.error;
      default:
        return colors.primary;
    }
  };

  // Determine button padding based on size
  const getPadding = () => {
    switch (size) {
      case 'small':
        return {paddingVertical: 6, paddingHorizontal: 12};
      case 'medium':
        return {paddingVertical: 10, paddingHorizontal: 16};
      case 'large':
        return {paddingVertical: 14, paddingHorizontal: 20};
      default:
        return {paddingVertical: 10, paddingHorizontal: 16};
    }
  };

  // Determine text size based on button size
  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'medium':
        return 14;
      case 'large':
        return 16;
      default:
        return 14;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: type === 'outline' ? 1 : 0,
          width: fullWidth ? '100%' : 'auto',
          ...getPadding(),
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: getTextSize(),
            },
            textStyle,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Button;
