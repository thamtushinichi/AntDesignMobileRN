// src/components/ui/Switch.tsx
import React from 'react';
import { Switch as TamaguiSwitch, styled, SwitchProps } from 'tamagui';

// Create styled switch
const StyledSwitch = styled(TamaguiSwitch, {
  variants: {
    size: {
      small: {
        scale: 0.8,
      },
      medium: {
        scale: 1,
      },
      large: {
        scale: 1.2,
      },
    },
  } as const,
  defaultVariants: {
    size: 'medium',
  },
});

// Define custom switch props
type CustomSwitchProps = SwitchProps & {
  size?: 'small' | 'medium' | 'large';
  onValueChange?: (value: boolean) => void;
};

const Switch = ({
                  size = 'medium',
                  onValueChange,
                  ...props
                }: CustomSwitchProps) => {
  return (
    <StyledSwitch
      size={size}
      backgroundColor="$textMuted"
      outlineColor="$borderColor"
      // When checked, the background color is primary
      checked={props.checked}
      onCheckedChange={onValueChange}
      {...props}
    >
      <TamaguiSwitch.Thumb
        backgroundColor="$background"
        animation="quick"
      />
    </StyledSwitch>
  );
};

export default Switch;
