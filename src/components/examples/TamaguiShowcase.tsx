// src/components/examples/TamaguiShowcase.tsx - Fixed Version
import React, { useState } from 'react';
import {
  Button,
  Card,
  Input,
  List,
  Switch,
  Modal,
  Avatar,
  Badge,
  Checkbox,
} from '../../components/ui';
import {
  YStack,
  XStack,
  Text,
  styled,
  Slider,
  Progress,
  TextArea,
  Circle,
  Square,
  Separator,
  H1,
  H2,
  H3,
  H4,
  Paragraph,
  Spinner,
} from 'tamagui';
import {
  Heart,
  Star,
  Settings,
  User,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle,
  Info,
  Plus,
  Search,
  Bell,
  Home,
  MessageCircle,
  Camera,
  MapPin,
  Clock,
} from '@tamagui/lucide-icons';
import {
  useThemeColors,
  getShadow,
  withAlpha,
  palette,
} from '../../tamagui.advanced';

// Enhanced Button Component
const EnhancedButton = styled(Button, {
  borderRadius: '$md',
  fontFamily: '$body',
  fontWeight: '500',

  hoverStyle: {
    opacity: 0.9,
  },

  pressStyle: {
    opacity: 0.8,
    scale: 0.98,
  },

  focusStyle: {
    borderColor: '$primary',
    borderWidth: 2,
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: 'white',
      },
      secondary: {
        backgroundColor: '$secondary',
        color: '$color',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
        color: '$color',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$color',
      },
      danger: {
        backgroundColor: '$error',
        color: 'white',
      },
      success: {
        backgroundColor: '$success',
        color: 'white',
      },
    },
    size: {
      sm: {
        height: '$8',
        paddingHorizontal: '$3',
        fontSize: '$sm',
      },
      md: {
        height: '$11',
        paddingHorizontal: '$4',
        fontSize: '$md',
      },
      lg: {
        height: '$14',
        paddingHorizontal: '$5',
        fontSize: '$lg',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

// Status Badge Component
const StatusBadge = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: '$3',
  paddingVertical: '$1',
  borderRadius: '$round',

  variants: {
    status: {
      success: {
        backgroundColor: '$success',
      },
      warning: {
        backgroundColor: '$warning',
      },
      error: {
        backgroundColor: '$error',
      },
      info: {
        backgroundColor: '$info',
      },
      neutral: {
        backgroundColor: '$borderColor',
      },
    },
    size: {
      sm: {
        paddingHorizontal: '$2',
        paddingVertical: 2,
      },
      md: {
        paddingHorizontal: '$3',
        paddingVertical: '$1',
      },
    },
  } as const,

  defaultVariants: {
    status: 'neutral',
    size: 'md',
  },
});

// Alert Component
const Alert = styled(XStack, {
  padding: '$4',
  borderRadius: '$md',
  borderLeftWidth: 4,
  alignItems: 'flex-start',
  space: '$3',

  variants: {
    variant: {
      info: {
        backgroundColor: withAlpha(palette.info[500], 0.1),
        borderLeftColor: '$info',
      },
      success: {
        backgroundColor: withAlpha(palette.success[500], 0.1),
        borderLeftColor: '$success',
      },
      warning: {
        backgroundColor: withAlpha(palette.warning[500], 0.1),
        borderLeftColor: '$warning',
      },
      error: {
        backgroundColor: withAlpha(palette.error[500], 0.1),
        borderLeftColor: '$error',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'info',
  },
});

// Enhanced Card Component
const EnhancedCard = styled(Card, {
  backgroundColor: '$background',
  borderRadius: '$lg',
  padding: '$4',
  borderWidth: 1,
  borderColor: '$borderColor',

  hoverStyle: {
    borderColor: '$borderColorHover',
  },

  variants: {
    variant: {
      default: {},
      elevated: {
        shadowColor: '$shadowColor',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      },
      outlined: {
        borderWidth: 2,
      },
      filled: {
        backgroundColor: '$secondary',
      },
    },
    size: {
      sm: {
        padding: '$3',
      },
      md: {
        padding: '$4',
      },
      lg: {
        padding: '$5',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

// Main Showcase Component - NO SCROLLVIEWS INSIDE
const TamaguiShowcase: React.FC = () => {
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);
  const [progressValue] = useState(75);
  const [inputValue, setInputValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [selectedTab, setSelectedTab] = useState('typography');

  const themeColors = useThemeColors();

  // Typography Section
  const TypographySection = () => (
    <YStack space="$4">
      <H2>Typography Showcase</H2>

      <YStack space="$3">
        <H1>Heading 1 - Display Text</H1>
        <H2>Heading 2 - Page Title</H2>
        <H3>Heading 3 - Section Title</H3>
        <H4>Heading 4 - Subsection</H4>
        <Paragraph>
          Paragraph text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Paragraph>
        <Text fontSize="$sm" color="$textMuted">
          Small text - Additional information or captions
        </Text>
      </YStack>

      <Separator />

      <YStack space="$2">
        <Text fontWeight="bold">Font Weights:</Text>
        <Text fontWeight="100">Thin (100)</Text>
        <Text fontWeight="300">Light (300)</Text>
        <Text fontWeight="400">Regular (400)</Text>
        <Text fontWeight="500">Medium (500)</Text>
        <Text fontWeight="600">SemiBold (600)</Text>
        <Text fontWeight="700">Bold (700)</Text>
        <Text fontWeight="900">Black (900)</Text>
      </YStack>
    </YStack>
  );

  // Colors Section
  const ColorsSection = () => (
    <YStack space="$4">
      <H2>Color Palette</H2>

      <YStack space="$3">
        <Text fontWeight="bold">Primary Colors</Text>
        <XStack space="$2" flexWrap="wrap">
          {Object.entries(palette.primary).map(([shade, color]) => (
            <YStack key={shade} alignItems="center" space="$1">
              <Square size={40} backgroundColor={color} borderRadius="$sm" />
              <Text fontSize="$xs">{shade}</Text>
            </YStack>
          ))}
        </XStack>
      </YStack>

      <YStack space="$3">
        <Text fontWeight="bold">Semantic Colors</Text>
        <XStack space="$2" flexWrap="wrap">
          <YStack alignItems="center" space="$1">
            <Square size={40} backgroundColor="$success" borderRadius="$sm" />
            <Text fontSize="$xs">Success</Text>
          </YStack>
          <YStack alignItems="center" space="$1">
            <Square size={40} backgroundColor="$warning" borderRadius="$sm" />
            <Text fontSize="$xs">Warning</Text>
          </YStack>
          <YStack alignItems="center" space="$1">
            <Square size={40} backgroundColor="$error" borderRadius="$sm" />
            <Text fontSize="$xs">Error</Text>
          </YStack>
          <YStack alignItems="center" space="$1">
            <Square size={40} backgroundColor="$info" borderRadius="$sm" />
            <Text fontSize="$xs">Info</Text>
          </YStack>
        </XStack>
      </YStack>

      <YStack space="$3">
        <Text fontWeight="bold">Alpha Colors</Text>
        <XStack space="$2" flexWrap="wrap">
          {[0.1, 0.2, 0.4, 0.6, 0.8].map((alpha) => (
            <YStack key={alpha} alignItems="center" space="$1">
              <Square
                size={40}
                backgroundColor={themeColors.withAlpha('primary', alpha)}
                borderRadius="$sm"
              />
              <Text fontSize="$xs">{Math.round(alpha * 100)}%</Text>
            </YStack>
          ))}
        </XStack>
      </YStack>
    </YStack>
  );

  // Buttons Section
  const ButtonsSection = () => (
    <YStack space="$4">
      <H2>Button Variants</H2>

      <YStack space="$3">
        <Text fontWeight="bold">Button Variants</Text>
        <XStack space="$2" flexWrap="wrap">
          <EnhancedButton variant="primary">Primary</EnhancedButton>
          <EnhancedButton variant="secondary">Secondary</EnhancedButton>
          <EnhancedButton variant="outline">Outline</EnhancedButton>
          <EnhancedButton variant="ghost">Ghost</EnhancedButton>
          <EnhancedButton variant="danger">Danger</EnhancedButton>
          <EnhancedButton variant="success">Success</EnhancedButton>
        </XStack>
      </YStack>

      <YStack space="$3">
        <Text fontWeight="bold">Button Sizes</Text>
        <XStack space="$2" alignItems="center">
          <EnhancedButton variant="primary" size="sm">Small</EnhancedButton>
          <EnhancedButton variant="primary" size="md">Medium</EnhancedButton>
          <EnhancedButton variant="primary" size="lg">Large</EnhancedButton>
        </XStack>
      </YStack>

      <YStack space="$3">
        <Text fontWeight="bold">Button with Icons</Text>
        <XStack space="$2" flexWrap="wrap">
          <EnhancedButton variant="primary" icon={<Plus size="$1" />}>
            Add Item
          </EnhancedButton>
          <EnhancedButton variant="outline" icon={<Search size="$1" />}>
            Search
          </EnhancedButton>
          <EnhancedButton variant="ghost" icon={<Settings size="$1" />}>
            Settings
          </EnhancedButton>
        </XStack>
      </YStack>

      <EnhancedButton variant="primary" fullWidth>
        Full Width Button
      </EnhancedButton>
    </YStack>
  );

  // Form Elements Section
  const FormElementsSection = () => (
    <YStack space="$4">
      <H2>Form Elements</H2>

      <YStack space="$3">
        <Text fontWeight="bold">Input Fields</Text>
        <Input
          placeholder="Enter text here..."
          value={inputValue}
          onChangeText={setInputValue}
          size="$4"
        />
        <Input
          placeholder="Disabled input"
          disabled
          opacity={0.6}
          size="$4"
        />
        <TextArea
          placeholder="Enter multiline text..."
          value={textAreaValue}
          onChangeText={setTextAreaValue}
          numberOfLines={4}
        />
      </YStack>

      <YStack space="$3">
        <Text fontWeight="bold">Switch & Slider</Text>
        <XStack alignItems="center" space="$3">
          <Text>Enable notifications</Text>
          <Switch
            checked={switchValue}
            onCheckedChange={setSwitchValue}
            size="$4"
          >
            <Switch.Thumb />
          </Switch>
        </XStack>

        <YStack space="$2">
          <Text>Volume: {sliderValue[0]}%</Text>
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            max={100}
            min={0}
            step={1}
            size="$4"
          >
            <Slider.Track>
              <Slider.TrackActive />
            </Slider.Track>
            <Slider.Thumb index={0} circular />
          </Slider>
        </YStack>
      </YStack>

      <YStack space="$3">
        <Text fontWeight="bold">Progress Bar</Text>
        <Progress value={progressValue} max={100} size="$4">
          <Progress.Indicator />
        </Progress>
        <Text fontSize="$sm" color="$textMuted">
          {progressValue}% complete
        </Text>
      </YStack>
    </YStack>
  );

  // Cards Section
  const CardsSection = () => (
    <YStack space="$4">
      <H2>Cards & Containers</H2>

      <YStack space="$3">
        <Text fontWeight="bold">Card Variants</Text>

        <EnhancedCard variant="default" size="md">
          <H4>Default Card</H4>
          <Paragraph>This is a default card with standard styling.</Paragraph>
        </EnhancedCard>

        <EnhancedCard variant="elevated" size="md">
          <H4>Elevated Card</H4>
          <Paragraph>This card has enhanced shadow for elevation.</Paragraph>
        </EnhancedCard>

        <EnhancedCard variant="outlined" size="md">
          <H4>Outlined Card</H4>
          <Paragraph>This card has a prominent border.</Paragraph>
        </EnhancedCard>

        <EnhancedCard variant="filled" size="md">
          <H4>Filled Card</H4>
          <Paragraph>This card has a filled background.</Paragraph>
        </EnhancedCard>
      </YStack>
    </YStack>
  );

  // Status & Feedback Section
  const StatusSection = () => (
    <YStack space="$4">
      <H2>Status & Feedback</H2>

      <YStack space="$3">
        <Text fontWeight="bold">Status Badges</Text>
        <XStack space="$2" flexWrap="wrap">
          <StatusBadge status="success">
            <Text color="white" fontSize="$sm">Success</Text>
          </StatusBadge>
          <StatusBadge status="warning">
            <Text color="white" fontSize="$sm">Warning</Text>
          </StatusBadge>
          <StatusBadge status="error">
            <Text color="white" fontSize="$sm">Error</Text>
          </StatusBadge>
          <StatusBadge status="info">
            <Text color="white" fontSize="$sm">Info</Text>
          </StatusBadge>
          <StatusBadge status="neutral">
            <Text fontSize="$sm">Neutral</Text>
          </StatusBadge>
        </XStack>
      </YStack>

      <YStack space="$3">
        <Text fontWeight="bold">Alert Messages</Text>

        <Alert variant="info">
          <Info size="$1" color="$info" />
          <YStack flex={1}>
            <Text fontWeight="bold" color="$info">Information</Text>
            <Text>This is an informational message.</Text>
          </YStack>
        </Alert>

        <Alert variant="success">
          <CheckCircle size="$1" color="$success" />
          <YStack flex={1}>
            <Text fontWeight="bold" color="$success">Success</Text>
            <Text>Your action was completed successfully.</Text>
          </YStack>
        </Alert>

        <Alert variant="warning">
          <AlertCircle size="$1" color="$warning" />
          <YStack flex={1}>
            <Text fontWeight="bold" color="$warning">Warning</Text>
            <Text>Please review this information carefully.</Text>
          </YStack>
        </Alert>

        <Alert variant="error">
          <XCircle size="$1" color="$error" />
          <YStack flex={1}>
            <Text fontWeight="bold" color="$error">Error</Text>
            <Text>Something went wrong. Please try again.</Text>
          </YStack>
        </Alert>
      </YStack>

      <YStack space="$3">
        <Text fontWeight="bold">Loading States</Text>
        <XStack space="$3" alignItems="center">
          <Spinner size="small" color="$primary" />
          <Text>Loading...</Text>
        </XStack>
      </YStack>
    </YStack>
  );

  // Icons Section
  const IconsSection = () => (
    <YStack space="$4">
      <H2>Icons Collection</H2>

      <YStack space="$3">
        <Text fontWeight="bold">Common Icons</Text>
        <XStack space="$3" flexWrap="wrap">
          <YStack alignItems="center" space="$1">
            <Circle size={40} backgroundColor="$primary" alignItems="center" justifyContent="center">
              <User size="$1" color="white" />
            </Circle>
            <Text fontSize="$xs">User</Text>
          </YStack>

          <YStack alignItems="center" space="$1">
            <Circle size={40} backgroundColor="$success" alignItems="center" justifyContent="center">
              <CheckCircle size="$1" color="white" />
            </Circle>
            <Text fontSize="$xs">Check</Text>
          </YStack>

          <YStack alignItems="center" space="$1">
            <Circle size={40} backgroundColor="$warning" alignItems="center" justifyContent="center">
              <AlertCircle size="$1" color="white" />
            </Circle>
            <Text fontSize="$xs">Alert</Text>
          </YStack>

          <YStack alignItems="center" space="$1">
            <Circle size={40} backgroundColor="$info" alignItems="center" justifyContent="center">
              <Settings size="$1" color="white" />
            </Circle>
            <Text fontSize="$xs">Settings</Text>
          </YStack>

          <YStack alignItems="center" space="$1">
            <Circle size={40} backgroundColor="$error" alignItems="center" justifyContent="center">
              <Heart size="$1" color="white" />
            </Circle>
            <Text fontSize="$xs">Heart</Text>
          </YStack>

          <YStack alignItems="center" space="$1">
            <Circle size={40} backgroundColor="$borderColor" alignItems="center" justifyContent="center">
              <Star size="$1" color="$primary" />
            </Circle>
            <Text fontSize="$xs">Star</Text>
          </YStack>
        </XStack>
      </YStack>

      <YStack space="$3">
        <Text fontWeight="bold">Navigation Icons</Text>
        <XStack space="$2" flexWrap="wrap">
          <Home size="$2" color="$primary" />
          <Search size="$2" color="$primary" />
          <Bell size="$2" color="$primary" />
          <MessageCircle size="$2" color="$primary" />
          <Camera size="$2" color="$primary" />
          <MapPin size="$2" color="$primary" />
          <Calendar size="$2" color="$primary" />
          <Clock size="$2" color="$primary" />
          <Mail size="$2" color="$primary" />
          <Phone size="$2" color="$primary" />
        </XStack>
      </YStack>
    </YStack>
  );

  // Avatar & Profile Section
  const AvatarSection = () => (
    <YStack space="$4">
      <H2>Avatars & Profiles</H2>

      <YStack space="$3">
        <Text fontWeight="bold">Avatar Sizes</Text>
        <XStack space="$3" alignItems="center">
          <Avatar circular size="$3">
            <Avatar.Image src="https://picsum.photos/100/100?random=1" />
            <Avatar.Fallback backgroundColor="$primary">
              <Text color="white" fontSize="$sm">JD</Text>
            </Avatar.Fallback>
          </Avatar>

          <Avatar circular size="$5">
            <Avatar.Image src="https://picsum.photos/100/100?random=2" />
            <Avatar.Fallback backgroundColor="$success">
              <Text color="white">AS</Text>
            </Avatar.Fallback>
          </Avatar>

          <Avatar circular size="$7">
            <Avatar.Image src="https://picsum.photos/100/100?random=3" />
            <Avatar.Fallback backgroundColor="$warning">
              <Text color="white" fontSize="$lg">MK</Text>
            </Avatar.Fallback>
          </Avatar>
        </XStack>
      </YStack>

      <YStack space="$3">
        <Text fontWeight="bold">Profile Cards</Text>
        <EnhancedCard>
          <XStack space="$3" alignItems="center">
            <Avatar circular size="$6">
              <Avatar.Image src="https://picsum.photos/100/100?random=4" />
              <Avatar.Fallback backgroundColor="$primary">
                <User size="$2" color="white" />
              </Avatar.Fallback>
            </Avatar>
            <YStack flex={1}>
              <Text fontWeight="bold" fontSize="$lg">John Doe</Text>
              <Text color="$textMuted">Software Engineer</Text>
              <Text color="$textMuted" fontSize="$sm">john@example.com</Text>
            </YStack>
            <XStack space="$2">
              <EnhancedButton size="sm" variant="outline" icon={<MessageCircle size="$1" />} />
              <EnhancedButton size="sm" variant="outline" icon={<Phone size="$1" />} />
            </XStack>
          </XStack>
        </EnhancedCard>
      </YStack>
    </YStack>
  );

  // Shadow Examples - Simplified for compatibility
  const ShadowSection = () => (
    <YStack space="$4">
      <H2>Shadows & Elevation</H2>

      <XStack space="$3" flexWrap="wrap">
        {['sm', 'md', 'lg', 'xl'].map((shadowSize) => (
          <YStack key={shadowSize} alignItems="center" space="$2">
            <Square
              size={80}
              backgroundColor="$background"
              borderRadius="$md"
              alignItems="center"
              justifyContent="center"
              shadowColor="$shadowColor"
              shadowOffset={{ width: 0, height: 2 }}
              shadowOpacity={0.1}
              shadowRadius={4}
              elevation={3}
            >
              <Text fontSize="$sm" fontWeight="bold">{shadowSize}</Text>
            </Square>
            <Text fontSize="$xs" color="$textMuted">Shadow {shadowSize}</Text>
          </YStack>
        ))}
      </XStack>
    </YStack>
  );

  const sections = {
    typography: TypographySection,
    colors: ColorsSection,
    buttons: ButtonsSection,
    forms: FormElementsSection,
    cards: CardsSection,
    status: StatusSection,
    icons: IconsSection,
    avatars: AvatarSection,
    shadows: ShadowSection,
  };

  const tabs = [
    { key: 'typography', label: 'Typography' },
    { key: 'colors', label: 'Colors' },
    { key: 'buttons', label: 'Buttons' },
    { key: 'forms', label: 'Forms' },
    { key: 'cards', label: 'Cards' },
    { key: 'status', label: 'Status' },
    { key: 'icons', label: 'Icons' },
    { key: 'avatars', label: 'Avatars' },
    { key: 'shadows', label: 'Shadows' },
  ];

  const SelectedSection = sections[selectedTab];

  return (
    <YStack space="$lg">
      {/* Header - Simplified */}
      <YStack space="$md">
        <H1>Tamagui Design System</H1>
        <Text color="$textMuted">Complete showcase of components and styling</Text>
      </YStack>

      <Separator />

      {/* Enhanced Tab Navigation - Only after updating Button.tsx */}
      <YStack>
        <XStack space="$2" paddingHorizontal="$sm" flexWrap="wrap">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              variant={selectedTab === tab.key ? 'primary' : 'outline'}
              size="small"
              onPress={() => setSelectedTab(tab.key)}
              pressStyle={{ scale: 0.95 }}
            >
              {tab.label}
            </Button>
          ))}
        </XStack>
      </YStack>

      <Separator />

      {/* Content - NO SCROLLVIEW */}
      <YStack space="$md">
        <SelectedSection />
      </YStack>
    </YStack>
  );
};

export default TamaguiShowcase;
