// src/components/ui/List.tsx
import React, { ReactNode } from 'react';
import { YStack, XStack, Text, Separator, styled } from 'tamagui';

// Create styled list item
const StyledListItem = styled(XStack, {
  variants: {
    variant: {
      default: {
        borderBottomWidth: 1,
        borderBottomColor: '$borderColor',
      },
      card: {
        borderWidth: 1,
        borderColor: '$borderColor',
        borderRadius: '$sm',
        marginBottom: '$sm',
      },
    },
    size: {
      small: {
        minHeight: 48,
        paddingVertical: '$sm',
        paddingHorizontal: '$md',
      },
      medium: {
        minHeight: 56,
        paddingVertical: '$md',
        paddingHorizontal: '$md',
      },
      large: {
        minHeight: 64,
        paddingVertical: '$lg',
        paddingHorizontal: '$md',
      },
    },
  } as const,
  defaultVariants: {
    variant: 'default',
    size: 'medium',
  },
});

interface ListItemProps extends React.ComponentProps<typeof StyledListItem> {
  title: string;
  subtitle?: string;
  left?: ReactNode;
  right?: ReactNode;
  onPress?: () => void;
  arrow?: boolean;
}

const ListItem = ({
                    title,
                    subtitle,
                    left,
                    right,
                    onPress,
                    arrow,
                    ...props
                  }: ListItemProps) => {
  return (
    <StyledListItem
      backgroundColor="$background"
      alignItems="center"
      justifyContent="space-between"
      pressable={!!onPress}
      onPress={onPress}
      {...props}
    >
      <XStack flex={1} alignItems="center" space="$md">
        {left && left}
        <YStack flex={1}>
          <Text fontSize="$md" color="$color">{title}</Text>
          {subtitle && (
            <Text fontSize="$sm" color="$textMuted">{subtitle}</Text>
          )}
        </YStack>
      </XStack>
      <XStack alignItems="center">
        {right && right}
        {arrow && (
          <Text ml="$sm" color="$textMuted">→</Text>
        )}
      </XStack>
    </StyledListItem>
  );
};

interface ListProps extends React.ComponentProps<typeof YStack> {
  children: ReactNode;
  header?: string | ReactNode;
  footer?: string | ReactNode;
  separated?: boolean;
}

const List = ({
                children,
                header,
                footer,
                separated = true,
                ...props
              }: ListProps) => {
  return (
    <YStack {...props}>
      {header && (
        typeof header === 'string' ? (
          <Text fontSize="$sm" fontWeight="bold" marginBottom="$xs" marginLeft="$md" color="$textLight">
            {header}
          </Text>
        ) : (
          header
        )
      )}

      <YStack
        backgroundColor="$background"
        borderRadius="$sm"
        overflow="hidden"
      >
        {React.Children.map(children, (child, index) => {
          if (!child) return null;

          return (
            <>
              {child}
              {separated && index < React.Children.count(children) - 1 && (
                <Separator borderColor="$borderColor" />
              )}
            </>
          );
        })}
      </YStack>

      {footer && (
        typeof footer === 'string' ? (
          <Text fontSize="$xs" marginTop="$xs" marginLeft="$md" color="$textMuted">
            {footer}
          </Text>
        ) : (
          footer
        )
      )}
    </YStack>
  );
};

// Export the combined components
export default {
  Root: List,
  Item: ListItem
};
