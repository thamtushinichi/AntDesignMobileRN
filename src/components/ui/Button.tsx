// src/components/ui/Button.tsx - Fixed Version
import React from 'react';
import { Button as TamaguiButton, ButtonProps, styled, GetProps } from 'tamagui';

// Create styled button variations
const StyledButton = styled(TamaguiButton, {
  // Add text color to ensure visibility
  color: '$color',
  fontWeight: '500',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: 'white', // Explicit white text for primary
      },
      secondary: {
        backgroundColor: '$secondary',
        borderColor: '$primary',
        borderWidth: 1,
        color: '$color', // Theme text color
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: '$primary',
        borderWidth: 1,
        color: '$primary', // Primary color text
      },
      danger: {
        backgroundColor: '$error',
        color: 'white', // White text for danger
      },
      ghost: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        color: '$color', // Theme text color
      },
    },
    size: {
      small: {
        height: 36,
        paddingHorizontal: 12,
        borderRadius: '$sm',
        fontSize: '$sm', // Add font size
      },
      medium: {
        height: 44,
        paddingHorizontal: 16,
        borderRadius: '$md',
        fontSize: '$md', // Add font size
      },
      large: {
        height: 52,
        paddingHorizontal: 20,
        borderRadius: '$md',
        fontSize: '$lg', // Add font size
      },
    },
    fullWidth: {
      true: {
        alignSelf: 'stretch',
      },
    },
  } as const,
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
    fullWidth: false,
  },
});

type CustomButtonProps = GetProps<typeof StyledButton> & {
  loading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode; // Make children explicit
};

const Button = ({
                  loading,
                  icon,
                  children,
                  disabled,
                  ...props
                }: CustomButtonProps) => {
  return (
    <StyledButton
      {...props}
      disabled={disabled || loading}
      opacity={disabled || loading ? 0.6 : 1}
      pressStyle={{ opacity: 0.8, scale: 0.98 }}
    >
      {icon && icon}
      {loading ? 'Loading...' : children}
    </StyledButton>
  );
};

export default Button;
