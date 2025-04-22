import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Button,
  List,
  Switch,
  Card,
  WhiteSpace,
  WingBlank,
  InputItem,
} from '@ant-design/react-native';
import {selectAntTheme, useThemeStore} from '../../store/zustand';

const ThemeExampleComponent: React.FC = () => {
  const antTheme = useThemeStore(selectAntTheme);
  return (
    <View style={[
      styles.container,
      // Use antTheme for background colors
      {backgroundColor: antTheme.fill_body}
    ]}>
      <WingBlank size="lg">
        <View style={styles.buttonsContainer}>
          <Button type="primary">Primary Button</Button>
          <WhiteSpace size="sm"/>
          <Button type="warning">Warning Button</Button>
          <WhiteSpace size="sm"/>
          <Button type="ghost">Ghost Button</Button>
        </View>

        <WhiteSpace size="lg"/>

        <List renderHeader={() => "Form Example"}>
          <InputItem placeholder="Username"/>
          <InputItem placeholder="Password" type="password"/>
          <List.Item
            extra={<Switch/>}
          >
            Enable Notifications
          </List.Item>
        </List>

        <WhiteSpace size="lg"/>

        <Card>
          <Card.Header title="Theme Colors"/>
          <Card.Body>
            <View style={styles.colorRow}>
              <ColorBox
                color={antTheme.brand_primary}
                name="Primary"
              />
              <ColorBox
                color={antTheme.success_color}
                name="Success"
              />
              <ColorBox
                color={antTheme.warning_color}
                name="Warning"
              />
              <ColorBox
                color={antTheme.error_color}
                name="Error"
              />
            </View>

            <WhiteSpace size="md"/>

            <View style={styles.colorRow}>
              <ColorBox
                color={antTheme.color_text_base}
                name="Text"
                textColor={antTheme.color_text_base_inverse}
              />
              <ColorBox
                color={antTheme.color_text_secondary}
                name="Secondary"
                textColor={antTheme.color_text_base_inverse}
              />
              <ColorBox
                color={antTheme.fill_base}
                name="Background"
                textColor={antTheme.color_text_base}
                bordered
              />
              <ColorBox
                color={antTheme.border_color_base}
                name="Border"
                textColor={antTheme.color_text_base}
              />
            </View>
          </Card.Body>
        </Card>

        <WhiteSpace size="lg"/>

        <Text style={[
          styles.description,
          {color: antTheme.color_text_secondary}
        ]}>
          This example uses a single Ant Design theme for both component styling and custom UI elements.
        </Text>

        <WhiteSpace size="lg"/>
      </WingBlank>
    </View>
  );
};

// Helper component to display color swatches
const ColorBox: React.FC<{
  color: string;
  name: string;
  textColor?: string;
  bordered?: boolean;
}> = ({color, name, textColor = '#FFFFFF', bordered = false}) => {
  const antTheme = useThemeStore(selectAntTheme);
  return (
    <View style={styles.colorBoxContainer}>
      <View
        style={[
          styles.colorBox,
          {
            backgroundColor: color,
            borderWidth: bordered ? 1 : 0,
            borderColor: antTheme.border_color_base
          }
        ]}
      >
        <Text style={[styles.colorName, {color: textColor}]}>
          {name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    marginVertical: 10,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorBoxContainer: {
    width: '24%',
  },
  colorBox: {
    height: 60,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ThemeExampleComponent;
