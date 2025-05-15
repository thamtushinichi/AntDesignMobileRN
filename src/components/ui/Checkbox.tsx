// src/components/ui/Checkbox.tsx
import React from 'react';
import { Checkbox as TamaguiCheckbox, Label, XStack, styled } from 'tamagui';
import { Check } from '@tamagui/lucide-icons';

// Create styled checkbox container
const CheckboxContainer = styled(XStack, {
  alignItems: 'center',

  variants: {
    gap: {
      small: {
        gap: '$xs',
      },
      medium: {
        gap: '$sm',
      },
      large: {
        gap: '$md',
      },
    },
  } as const,
  defaultVariants: {
    gap: 'medium',
  },
});

interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  gap?: 'small' | 'medium' | 'large';
  id?: string;
  name?: string;
  value?: string;
  required?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
                                             checked,
                                             defaultChecked,
                                             onChange,
                                             onCheckedChange,
                                             disabled,
                                             label,
                                             size = 'medium',
                                             gap = 'medium',
                                             id,
                                             name,
                                             value,
                                             required,
                                           }) => {
  const handleCheckedChange = (isChecked: boolean) => {
    if (onChange) onChange(isChecked);
    if (onCheckedChange) onCheckedChange(isChecked);
  };

  // Convert size to numerical values
  const getSizeValue = () => {
    switch (size) {
      case 'small':
        return '$md';
      case 'large':
        return '$xl';
      case 'medium':
      default:
        return '$lg';
    }
  };

  return (
    <CheckboxContainer gap={gap}>
      <TamaguiCheckbox
        id={id}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={handleCheckedChange}
        disabled={disabled}
        size={getSizeValue()}
        borderColor="$borderColor"
        backgroundColor={disabled ? '$secondary' : undefined}
        opacity={disabled ? 0.6 : 1}
        required={required}
      >
        <TamaguiCheckbox.Indicator>
          <Check size="$sm" />
        </TamaguiCheckbox.Indicator>
      </TamaguiCheckbox>

      {label && (
        <Label
          size={size}
          htmlFor={id}
          opacity={disabled ? 0.6 : 1}
          color="$color"
        >
          {label}
          {required && <Label color="$error"> *</Label>}
        </Label>
      )}
    </CheckboxContainer>
  );
};

export default Checkbox;
