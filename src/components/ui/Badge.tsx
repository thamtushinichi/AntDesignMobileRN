// src/components/ui/Badge.tsx
import React, { ReactNode } from 'react';
import { XStack, styled, Text, GetProps } from 'tamagui';

// Create styled badge container
const BadgeContainer = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: '$xs',
  paddingVertical: '$xxs',

  variants: {
    variant: {
      default: {
        backgroundColor: '$primary',
      },
      secondary: {
        backgroundColor: '$secondary',
      },
      success: {
        backgroundColor: '$success',
      },
      warning: {
        backgroundColor: '$warning',
      },
      danger: {
        backgroundColor: '$error',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$primary',
      },
    },
    size: {
      small: {
        height: 16,
        minWidth: 16,
        borderRadius: 8,
      },
      medium: {
        height: 20,
        minWidth: 20,
        borderRadius: 10,
      },
      large: {
        height: 24,
        minWidth: 24,
        borderRadius: 12,
      },
    },
    shape: {
      round: {
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      pill: {
        borderRadius: 999,
        paddingHorizontal: '$sm',
      },
      square: {
        borderRadius: '$xs',
      },
    },
  } as const,
  defaultVariants: {
    variant: 'default',
    size: 'medium',
    shape: 'round',
  },
});

// Create styled badge text
const BadgeText = styled(Text, {
  color: 'white',
  textAlign: 'center',

  variants: {
    variant: {
      default: {
        color: 'white',
      },
      secondary: {
        color: '$color',
      },
      success: {
        color: 'white',
      },
      warning: {
        color: 'white',
      },
      danger: {
        color: 'white',
      },
      outline: {
        color: '$primary',
      },
    },
    size: {
      small: {
        fontSize: 10,
        lineHeight: 14,
      },
      medium: {
        fontSize: 12,
        lineHeight: 16,
      },
      large: {
        fontSize: 14,
        lineHeight: 20,
      },
    },
  } as const,
  defaultVariants: {
    variant: 'default',
    size: 'medium',
  },
});

// Define badge props
type BadgeProps = GetProps<typeof BadgeContainer> & {
  content?: string | number;
  children?: ReactNode;
  showZero?: boolean;
};

const Badge: React.FC<BadgeProps> = ({
                                       content,
                                       children,
                                       showZero = false,
                                       variant = 'default',
                                       size = 'medium',
                                       shape = 'round',
                                       ...props
                                     }) => {
  // If content is 0 and showZero is false, don't render the badge
  if (content === 0 && !showZero && !children) {
    return null;
  }

  // If content is a number greater than 99, show 99+
  const displayContent = typeof content === 'number' && content > 99 ? '99+' : content;

  return (
    <BadgeContainer
      variant={variant}
      size={size}
      shape={children ? 'pill' : shape}
      {...props}
    >
      {children ? (
        <BadgeText variant={variant} size={size}>
          {children}
        </BadgeText>
      ) : (
        <BadgeText variant={variant} size={size}>
          {displayContent}
        </BadgeText>
      )}
    </BadgeContainer>
  );
};

export default Badge;
