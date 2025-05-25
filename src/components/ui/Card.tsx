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

// Card Header Component
const CardHeader = ({ children }: { children: ReactNode }) => (
  <YStack paddingBottom="$sm" borderBottomWidth={1} borderBottomColor="$borderColor" marginBottom="$sm">
    {children}
  </YStack>
);

// Card Body Component
const CardBody = ({ children }: { children: ReactNode }) => (
  <YStack>
    {children}
  </YStack>
);

// Card Footer Component
const CardFooter = ({ children }: { children: ReactNode }) => (
  <YStack paddingTop="$sm" borderTopWidth={1} borderTopColor="$borderColor" marginTop="$sm">
    {children}
  </YStack>
);

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
          <CardHeader>
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
          </CardHeader>
        )}

        <CardBody>
          {children}
        </CardBody>

        {footer && (
          <CardFooter>
            {footer}
          </CardFooter>
        )}
      </YStack>
    </StyledCard>
  );
};

// Attach subcomponents
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
