import { useTheme } from '../../store/context/ThemeContext';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@ant-design/react-native';

const MyComponent = () => {
  // Get theme from context
  const { theme, antTheme } = useTheme();

  return (
    <View style={{ backgroundColor: antTheme.fill_body }}>
      <Text style={{ color: antTheme.color_text_base }}>
        Hello World
      </Text>

      {/* Ant Design components automatically use the theme */}
      <Button type="primary">Primary Button</Button>

      {/* For custom components, use antTheme colors directly */}
      <View style={{
        backgroundColor: antTheme.card_background,
        borderColor: antTheme.border_color_base,
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.m
      }}>
        <Text style={{ color: antTheme.color_text_secondary }}>
          Custom Card Content
        </Text>
      </View>
    </View>
  );
};
export default MyComponent;
