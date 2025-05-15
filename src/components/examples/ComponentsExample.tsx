// src/components/examples/ComponentsExample.tsx
import React, { useState } from 'react';
import { YStack, XStack, Text, Separator } from 'tamagui';
import { User, Bell, CheckCheck, Mail, Home, Settings } from '@tamagui/lucide-icons';

import {
  Button,
  Avatar,
  Badge,
  Checkbox,
  Card,
  Input,
  TabBar
} from '../ui';

const ComponentsExample: React.FC = () => {
  const [activeTab, setActiveTab] = useState('buttons');
  const [checkedState, setCheckedState] = useState({
    option1: false,
    option2: true,
    option3: false,
  });

  return (
    <YStack padding="$md" space="$md">
      <Card>
        <Card.Header>
          <Text fontSize="$xl" fontWeight="bold">Tamagui Components</Text>
        </Card.Header>
        <YStack padding="$sm">
          <Text>
            This screen showcases the custom UI components built with Tamagui.
            Each component demonstrates various styles and functionality.
          </Text>
        </YStack>
      </Card>

      <TabBar
        tabs={[
          {
            key: 'buttons',
            title: 'Buttons',
            children: <ButtonsSection />,
          },
          {
            key: 'inputs',
            title: 'Inputs',
            children: <InputsSection />,
          },
          {
            key: 'avatars',
            title: 'Avatars',
            children: <AvatarsSection />,
          },
          {
            key: 'badges',
            title: 'Badges',
            children: <BadgesSection />,
          },
          {
            key: 'others',
            title: 'Others',
            children: <OthersSection checkedState={checkedState} setCheckedState={setCheckedState} />,
          },
        ]}
        activeKey={activeTab}
        onChange={setActiveTab}
        variant="underline"
      />
    </YStack>
  );
};

// Buttons Section
const ButtonsSection = () => (
  <YStack padding="$md" space="$md">
    <Text fontSize="$lg" fontWeight="bold">Button Variants</Text>
    <XStack space="$sm" flexWrap="wrap">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="danger">Danger</Button>
    </XStack>

    <Separator marginVertical="$md" />

    <Text fontSize="$lg" fontWeight="bold">Button Sizes</Text>
    <XStack space="$sm" alignItems="center">
      <Button variant="primary" size="small">Small</Button>
      <Button variant="primary" size="medium">Medium</Button>
      <Button variant="primary" size="large">Large</Button>
    </XStack>

    <Separator marginVertical="$md" />

    <Text fontSize="$lg" fontWeight="bold">Button States</Text>
    <XStack space="$sm" flexWrap="wrap">
      <Button variant="primary">Normal</Button>
      <Button variant="primary" disabled>Disabled</Button>
      <Button variant="primary" loading>Loading</Button>
    </XStack>
  </YStack>
);

// Inputs Section
const InputsSection = () => (
  <YStack padding="$md" space="$md">
    <Text fontSize="$lg" fontWeight="bold">Input Types</Text>
    <Input
      label="Standard Input"
      placeholder="Enter text"
    />

    <Input
      label="With Hint"
      placeholder="Enter email"
      hint="We'll never share your email"
    />

    <Input
      label="With Error"
      placeholder="Enter password"
      secureTextEntry
      error="Password must be at least 8 characters"
    />

    <Input
      label="With Required"
      placeholder="Required field"
      required
    />

    <Input
      label="Disabled Input"
      placeholder="Cannot be modified"
      disabled
    />

    <Separator marginVertical="$md" />

    <Text fontSize="$lg" fontWeight="bold">Input with Icons</Text>
    <Input
      label="Email"
      placeholder="Enter your email"
      leftIcon={<Mail size="$sm" color="$textMuted" />}
    />

    <Input
      label="Settings"
      placeholder="Enter settings"
      rightIcon={<Settings size="$sm" color="$textMuted" />}
    />
  </YStack>
);

// Avatars Section
const AvatarsSection = () => (
  <YStack padding="$md" space="$md">
    <Text fontSize="$lg" fontWeight="bold">Avatar Sizes</Text>
    <XStack space="$sm" alignItems="center">
      <Avatar size="tiny" name="John Doe" />
      <Avatar size="small" name="John Doe" />
      <Avatar size="medium" name="John Doe" />
      <Avatar size="large" name="John Doe" />
      <Avatar size="xlarge" name="John Doe" />
    </XStack>

    <Separator marginVertical="$md" />

    <Text fontSize="$lg" fontWeight="bold">Avatar Colors</Text>
    <XStack space="$sm" alignItems="center">
      <Avatar name="John Doe" backgroundColor="$primary" />
      <Avatar name="Jane Smith" backgroundColor="$success" />
      <Avatar name="Bob Johnson" backgroundColor="$warning" />
      <Avatar name="Alice Brown" backgroundColor="$error" />
    </XStack>

    <Separator marginVertical="$md" />

    <Text fontSize="$lg" fontWeight="bold">Avatar with Icons</Text>
    <XStack space="$sm" alignItems="center">
      <Avatar icon={<User color="white" size="$md" />} backgroundColor="$primary" />
      <Avatar icon={<Bell color="white" size="$md" />} backgroundColor="$warning" />
      <Avatar icon={<CheckCheck color="white" size="$md" />} backgroundColor="$success" />
    </XStack>

    <Separator marginVertical="$md" />

    <Text fontSize="$lg" fontWeight="bold">Avatar Shapes</Text>
    <XStack space="$sm" alignItems="center">
      <Avatar name="John Doe" shape="circle" />
      <Avatar name="Jane Smith" shape="square" />
      <Avatar name="Bob Johnson" shape="rounded" />
    </XStack>
  </YStack>
);

// Badges Section
const BadgesSection = () => (
  <YStack padding="$md" space="$md">
    <Text fontSize="$lg" fontWeight="bold">Badge Variants</Text>
    <XStack space="$sm" alignItems="center">
      <Badge content={5} />
      <Badge content={10} variant="secondary" />
      <Badge content={15} variant="success" />
      <Badge content={20} variant="warning" />
      <Badge content={25} variant="danger" />
      <Badge content={30} variant="outline" />
    </XStack>

    <Separator marginVertical="$md" />

    <Text fontSize="$lg" fontWeight="bold">Badge Sizes</Text>
    <XStack space="$sm" alignItems="center">
      <Badge content={1} size="small" />
      <Badge content={2} size="medium" />
      <Badge content={3} size="large" />
    </XStack>

    <Separator marginVertical="$md" />

    <Text fontSize="$lg" fontWeight="bold">Badge Shapes</Text>
    <XStack space="$sm" alignItems="center">
      <Badge content={1} shape="round" />
      <Badge content={2} shape="pill" />
      <Badge content={3} shape="square" />
    </XStack>

    <Separator marginVertical="$md" />

    <Text fontSize="$lg" fontWeight="bold">Badge with Text</Text>
    <XStack space="$sm" alignItems="center">
      <Badge variant="primary" shape="pill">New</Badge>
      <Badge variant="success" shape="pill">Completed</Badge>
      <Badge variant="warning" shape="pill">Pending</Badge>
      <Badge variant="danger" shape="pill">Error</Badge>
    </XStack>
  </YStack>
);

// Others Section
const OthersSection = ({
                         checkedState,
                         setCheckedState
                       }: {
  checkedState: Record<string, boolean>;
  setCheckedState: (value: Record<string, boolean>) => void;
}) => (
  <YStack padding="$md" space="$md">
    <Text fontSize="$lg" fontWeight="bold">Checkbox</Text>
    <YStack space="$sm">
      <Checkbox
        label="Option 1"
        checked={checkedState.option1}
        onCheckedChange={(checked) => setCheckedState({...checkedState, option1: checked})}
        id="checkbox1"
      />
      <Checkbox
        label="Option 2"
        checked={checkedState.option2}
        onCheckedChange={(checked) => setCheckedState({...checkedState, option2: checked})}
        id="checkbox2"
      />
      <Checkbox
        label="Disabled Option"
        checked={checkedState.option3}
        onCheckedChange={(checked) => setCheckedState({...checkedState, option3: checked})}
        disabled
        id="checkbox3"
      />
    </YStack>

    <Separator marginVertical="$md" />

    <Text fontSize="$lg" fontWeight="bold">TabBar Examples</Text>
    <Text color="$textMuted">
      This entire screen uses TabBar for navigation.
      You can customize it with different styles and features.
    </Text>

    <YStack marginTop="$md" backgroundColor="$secondary" padding="$md" borderRadius="$md">
      <Text fontSize="$sm">
        TabBar can be customized with different variants:
      </Text>
      <Text fontSize="$sm" marginTop="$xs">
        - default
      </Text>
      <Text fontSize="$sm">
        - underline (like this example)
      </Text>
      <Text fontSize="$sm">
        - filled
      </Text>
    </YStack>
  </YStack>
);

export default ComponentsExample;
