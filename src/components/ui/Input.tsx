// src/components/ui/Input.tsx
import React, { useState } from 'react';
import { Input as TamaguiInput, styled, XStack, YStack, Text, Label, Spinner } from 'tamagui';

// Create styled input
const StyledInput = styled(TamaguiInput, {
  variants: {
    variant: {
      outlined: {
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      underlined: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderRadius: 0,
        borderColor: '$borderColor',
      },
      filled: {
        backgroundColor: '$secondary',
        borderWidth: 0,
      },
    },
    size: {
      small: {
        height: 36,
        fontSize: '$sm',
      },
      medium: {
        height: 44,
        fontSize: '$md',
      },
      large: {
        height: 52,
        fontSize: '$lg',
      },
    },
    isError: {
      true: {
        borderColor: '$error',
      },
    },
  } as const,
  defaultVariants: {
    variant: 'outlined',
    size: 'medium',
    isError: false,
  },
});

type InputProps = React.ComponentProps<typeof StyledInput> & {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
};

const Input = ({
                 label,
                 error,
                 hint,
                 required,
                 leftIcon,
                 rightIcon,
                 loading,
                 onChangeText,
                 onBlur,
                 ...props
               }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <YStack space="$xs">
      {label && (
        <XStack space="$xs">
          <Label fontSize="$sm" htmlFor={props.id}>
            {label}
            {required && <Text color="$error"> *</Text>}
          </Label>
        </XStack>
      )}

      <XStack
        alignItems="center"
        borderColor={error ? '$error' : isFocused ? '$primary' : '$borderColor'}
        borderWidth={1}
        borderRadius="$sm"
        paddingHorizontal={leftIcon ? '$sm' : 0}
      >
        {leftIcon && (
          <XStack marginRight="$sm">
            {leftIcon}
          </XStack>
        )}

        <StyledInput
          flex={1}
          height={props.size === 'small' ? 36 : props.size === 'large' ? 52 : 44}
          borderWidth={0}
          color="$color"
          backgroundColor="transparent"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          placeholderTextColor="$textMuted"
          {...props}
        />

        {(rightIcon || loading) && (
          <XStack marginLeft="$sm" paddingRight="$sm">
            {loading ? <Spinner size="small" color="$primary" /> : rightIcon}
          </XStack>
        )}
      </XStack>

      {(error || hint) && (
        <Text fontSize="$xs" color={error ? '$error' : '$textMuted'}>
          {error || hint}
        </Text>
      )}
    </YStack>
  );
};

export default Input;
