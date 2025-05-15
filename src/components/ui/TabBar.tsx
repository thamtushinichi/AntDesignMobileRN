// src/components/ui/TabBar.tsx
import React, { ReactNode, useState } from 'react';
import { YStack, XStack, styled, Text, Separator, Stack, View, GetProps } from 'tamagui';

// Create styled tab container
const TabHeader = styled(XStack, {
  backgroundColor: '$background',
  borderBottomWidth: 1,
  borderBottomColor: '$borderColor',

  variants: {
    scrollable: {
      true: {
        overflowX: 'scroll',
      },
    },
    position: {
      top: {
        borderTopWidth: 0,
      },
      bottom: {
        borderTopWidth: 1,
        borderTopColor: '$borderColor',
        borderBottomWidth: 0,
      },
    },
  } as const,
  defaultVariants: {
    scrollable: false,
    position: 'top',
  },
});

// Create styled tab item
const TabItem = styled(YStack, {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: '$sm',

  variants: {
    active: {
      true: {
        borderBottomWidth: 2,
        borderBottomColor: '$primary',
      },
      false: {
        borderBottomWidth: 0,
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
    variant: {
      default: {},
      underline: {},
      filled: {
        paddingHorizontal: '$md',
        borderRadius: '$md',
        marginHorizontal: '$xs',
      },
    },
    size: {
      small: {
        minHeight: 36,
      },
      medium: {
        minHeight: 48,
      },
      large: {
        minHeight: 56,
      },
    },
  } as const,
  defaultVariants: {
    active: false,
    disabled: false,
    variant: 'default',
    size: 'medium',
  },
});

// Create styled tab item text
const TabItemText = styled(Text, {
  textAlign: 'center',

  variants: {
    active: {
      true: {
        color: '$primary',
        fontWeight: 'bold',
      },
      false: {
        color: '$textMuted',
      },
    },
    disabled: {
      true: {
        color: '$textMuted',
      },
    },
    size: {
      small: {
        fontSize: '$sm',
      },
      medium: {
        fontSize: '$md',
      },
      large: {
        fontSize: '$lg',
      },
    },
  } as const,
  defaultVariants: {
    active: false,
    disabled: false,
    size: 'medium',
  },
});

// Define tab item props
export interface TabItemProps {
  key: string;
  title: string;
  icon?: ReactNode;
  disabled?: boolean;
  children: ReactNode;
}

// Define tab bar props
interface TabBarProps {
  tabs: TabItemProps[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  position?: 'top' | 'bottom';
  scrollable?: boolean;
  variant?: 'default' | 'underline' | 'filled';
  size?: 'small' | 'medium' | 'large';
  contentStyle?: GetProps<typeof YStack>;
}

const TabBar: React.FC<TabBarProps> = ({
                                         tabs,
                                         activeKey: propActiveKey,
                                         defaultActiveKey,
                                         onChange,
                                         position = 'top',
                                         scrollable = false,
                                         variant = 'default',
                                         size = 'medium',
                                         contentStyle,
                                       }) => {
  // Use controlled or uncontrolled active key
  const [internalActiveKey, setInternalActiveKey] = useState<string>(
    propActiveKey || defaultActiveKey || (tabs.length > 0 ? tabs[0].key : '')
  );

  // Determine actual active key
  const activeKey = propActiveKey !== undefined ? propActiveKey : internalActiveKey;

  // Handle tab change
  const handleTabChange = (key: string) => {
    if (propActiveKey === undefined) {
      setInternalActiveKey(key);
    }

    if (onChange) {
      onChange(key);
    }
  };

  // Find active content
  const activeContent = tabs.find(tab => tab.key === activeKey)?.children;

  return (
    <YStack flex={1}>
      {position === 'top' && (
        <TabHeader scrollable={scrollable} position={position}>
          {tabs.map(tab => (
            <TabItem
              key={tab.key}
              active={activeKey === tab.key}
              disabled={tab.disabled}
              onPress={() => !tab.disabled && handleTabChange(tab.key)}
              flex={scrollable ? undefined : 1}
              variant={variant}
              size={size}
              backgroundColor={
                variant === 'filled' && activeKey === tab.key
                  ? '$primary'
                  : undefined
              }
            >
              {tab.icon}
              <TabItemText
                active={activeKey === tab.key}
                disabled={tab.disabled}
                size={size}
                color={
                  variant === 'filled' && activeKey === tab.key
                    ? 'white'
                    : undefined
                }
              >
                {tab.title}
              </TabItemText>
            </TabItem>
          ))}
        </TabHeader>
      )}

      <YStack flex={1} {...contentStyle}>
        {activeContent}
      </YStack>

      {position === 'bottom' && (
        <TabHeader scrollable={scrollable} position={position}>
          {tabs.map(tab => (
            <TabItem
              key={tab.key}
              active={activeKey === tab.key}
              disabled={tab.disabled}
              onPress={() => !tab.disabled && handleTabChange(tab.key)}
              flex={scrollable ? undefined : 1}
              variant={variant}
              size={size}
            >
              {tab.icon}
              <TabItemText
                active={activeKey === tab.key}
                disabled={tab.disabled}
                size={size}
              >
                {tab.title}
              </TabItemText>
            </TabItem>
          ))}
        </TabHeader>
      )}
    </YStack>
  );
};

export default TabBar;
