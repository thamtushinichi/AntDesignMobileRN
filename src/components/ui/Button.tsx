// src/components/ui/Button.tsx
import React from 'react';
import { Button as TamaguiButton, ButtonProps, styled, GetProps } from 'tamagui';

// Create styled button variations
const StyledButton = styled(TamaguiButton, {
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
      },
      secondary: {
        backgroundColor: '$secondary',
        borderColor: '$primary',
        borderWidth: 1,
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: '$primary',
        borderWidth: 1,
      },
      danger: {
        backgroundColor: '$error',
      },
      ghost: {
        backgroundColor: 'transparent',
        borderWidth: 0,
      },
    },
    size: {
      small: {
        height: 36,
        paddingHorizontal: 12,
        borderRadius: '$sm',
      },
      medium: {
        height: 44,
        paddingHorizontal: 16,
        borderRadius: '$md',
      },
      large: {
        height: 52,
        paddingHorizontal: 20,
        borderRadius: '$md',
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
      pressStyle={{ opacity: 0.8 }}
    >
      {loading ? 'Loading...' : children}
    </StyledButton>
  );
};

export default Button;
