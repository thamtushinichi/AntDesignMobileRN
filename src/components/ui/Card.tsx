// src/components/ui/Card.tsx
import React, { ReactNode } from 'react';
import { Card as TamaguiCard, XStack, YStack, Text, styled } from 'tamagui';

// Create styled card
const StyledCard = styled(TamaguiCard, {
  variants: {
    variant: {
      elevated: {
        shadowColor: '$shadowColor',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
      },
      outlined: {
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      flat: {
        shadowColor: 'transparent',
        borderWidth: 0,
      },
    },
    size: {
      small: {
        padding: '$sm',
      },
      medium: {
        padding: '$md',
      },
      large: {
        padding: '$lg',
      },
    },
  } as const,
  defaultVariants: {
    variant: 'elevated',
    size: 'medium',
  },
});

type CardProps = React.ComponentProps<typeof StyledCard> & {
  title?: string;
  subtitle?: string;
  extra?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
};

const Card = ({
                title,
                subtitle,
                extra,
                children,
                footer,
                ...props
              }: CardProps) => {
  const hasHeader = title || subtitle || extra;

  return (
    <StyledCard
      backgroundColor="$card"
      {...props}
    >
      <YStack space="$sm">
        {hasHeader && (
          <XStack justifyContent="space-between" alignItems="center">
            <YStack>
              {title && (
                <Text fontSize="$lg" fontWeight="bold" color="$color">
                  {title}
                </Text>
              )}
              {subtitle && (
                <Text fontSize="$sm" color="$textMuted">
                  {subtitle}
                </Text>
              )}
            </YStack>
            {extra && (
              <XStack>{extra}</XStack>
            )}
          </XStack>
        )}

        <YStack>
          {children}
        </YStack>

        {footer && (
          <XStack mt="$sm">
            {footer}
          </XStack>
        )}
      </YStack>
    </StyledCard>
  );
};

export default Card;
