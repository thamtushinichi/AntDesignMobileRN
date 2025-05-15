// src/components/common/ThemeExampleComponent.tsx
import React from 'react';
import { YStack, XStack, Text, Switch, Input, Button, Card, View, H3, Separator } from 'tamagui';
import { useThemeStore, selectIsDarkMode } from '../../store/zustand';

const ThemeExampleComponent: React.FC = () => {
  const isDarkMode = useThemeStore(selectIsDarkMode);

  return (
    <YStack padding="$md" space="$lg">
      <YStack space="$md">
        <H3>Buttons</H3>
        <XStack space="$sm" flexWrap="wrap">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger</Button>
        </XStack>
      </YStack>

      <Separator />

      <YStack space="$md">
        <H3>Form Elements</H3>
        <YStack space="$md">
          <Input
            placeholder="Username"
            label="Username"
          />
          <Input
            placeholder="Password"
            label="Password"
            secureTextEntry
          />
          <XStack alignItems="center" space="$md">
            <Text>Dark Mode</Text>
            <Switch checked={isDarkMode} onCheckedChange={useThemeStore.getState().toggleTheme} />
          </XStack>
        </YStack>
      </YStack>

      <Separator />

      <YStack space="$md">
        <H3>Cards</H3>
        <Card size="medium">
          <Card.Header>
            <Text fontSize="$lg" fontWeight="bold">Card Title</Text>
          </Card.Header>
          <Separator marginVertical="$sm" />
          <YStack space="$sm">
            <Text>This is a simple card content. Cards are useful for grouping related content.</Text>
          </YStack>
        </Card>
      </YStack>

      <Separator />

      <YStack space="$md">
        <H3>Theme Colors</H3>
        <XStack space="$sm" flexWrap="wrap">
          <ColorBlock name="Primary" color="$primary" />
          <ColorBlock name="Background" color="$background" />
          <ColorBlock name="Card" color="$card" />
          <ColorBlock name="Text" color="$color" invertText />
        </XStack>
        <XStack space="$sm" flexWrap="wrap" marginTop="$sm">
          <ColorBlock name="Success" color="$success" />
          <ColorBlock name="Warning" color="$warning" />
          <ColorBlock name="Error" color="$error" />
          <ColorBlock name="Border" color="$borderColor" />
        </XStack>
      </YStack>
    </YStack>
  );
};

// Helper component to display color swatches
const ColorBlock: React.FC<{
  name: string;
  color: string;
  invertText?: boolean;
}> = ({ name, color, invertText }) => {
  return (
    <YStack>
      <View
        width={70}
        height={70}
        backgroundColor={color}
        borderRadius="$sm"
        alignItems="center"
        justifyContent="center"
        marginBottom="$xs"
        borderWidth={1}
        borderColor="$borderColor"
      >
        <Text color={invertText ? "$background" : "$color"} fontSize="$xs" fontWeight="bold">
          {name}
        </Text>
      </View>
    </YStack>
  );
};

export default ThemeExampleComponent;
