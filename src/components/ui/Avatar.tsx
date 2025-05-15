// src/components/ui/Avatar.tsx
import React, { ReactNode } from 'react';
import { YStack, styled, Text, GetProps } from 'tamagui';

// Create styled avatar container
const AvatarContainer = styled(YStack, {
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',

  variants: {
    size: {
      tiny: {
        width: 24,
        height: 24,
        borderRadius: 12,
      },
      small: {
        width: 36,
        height: 36,
        borderRadius: 18,
      },
      medium: {
        width: 48,
        height: 48,
        borderRadius: 24,
      },
      large: {
        width: 64,
        height: 64,
        borderRadius: 32,
      },
      xlarge: {
        width: 80,
        height: 80,
        borderRadius: 40,
      },
    },
    shape: {
      circle: {
        borderRadius: 999,
      },
      square: {
        borderRadius: '$sm',
      },
      rounded: {
        borderRadius: '$md',
      },
    },
  } as const,
  defaultVariants: {
    size: 'medium',
    shape: 'circle',
  },
});

// Create styled avatar text
const AvatarText = styled(Text, {
  fontWeight: 'bold',
  color: 'white',

  variants: {
    size: {
      tiny: {
        fontSize: 10,
      },
      small: {
        fontSize: 14,
      },
      medium: {
        fontSize: 18,
      },
      large: {
        fontSize: 24,
      },
      xlarge: {
        fontSize: 32,
      },
    },
  } as const,
  defaultVariants: {
    size: 'medium',
  },
});

// Define avatar props
type AvatarProps = GetProps<typeof AvatarContainer> & {
  name?: string;
  src?: string;
  icon?: ReactNode;
  children?: ReactNode;
  backgroundColor?: string;
};

const Avatar: React.FC<AvatarProps> = ({
                                         name,
                                         src,
                                         icon,
                                         children,
                                         backgroundColor = '$primary',
                                         size = 'medium',
                                         ...props
                                       }) => {
  // Get initials from name
  const getInitials = (name: string): string => {
    if (!name) return '';

    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    } else {
      return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    }
  };

  const renderContent = () => {
    if (children) {
      return children;
    }

    if (src) {
      // For simplicity, we're not implementing an Image component here
      // In a real app, you would use a proper Image component
      return <Text>Image</Text>;
    }

    if (icon) {
      return icon;
    }

    if (name) {
      return <AvatarText size={size}>{getInitials(name)}</AvatarText>;
    }

    // Default fallback
    return <AvatarText size={size}>?</AvatarText>;
  };

  return (
    <AvatarContainer
      size={size}
      backgroundColor={backgroundColor}
      {...props}
    >
      {renderContent()}
    </AvatarContainer>
  );
};

export default Avatar;
