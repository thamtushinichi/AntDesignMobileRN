// src/components/forms/FormField.tsx
import React from 'react';
import { YStack } from 'tamagui';
import { Input } from '../ui';

interface FormFieldProps {
  name: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
  maxLength?: number;
  disabled?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  testID?: string;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
                                               name,
                                               label,
                                               value,
                                               onChange,
                                               onBlur,
                                               placeholder,
                                               error,
                                               touched,
                                               secureTextEntry = false,
                                               keyboardType = 'default',
                                               maxLength,
                                               disabled = false,
                                               autoCapitalize = 'none',
                                               testID,
                                               required = false,
                                             }) => {
  // Only show error if field has been touched
  const showError = touched && error;

  return (
    <YStack testID={`field-${name}`} marginBottom="$md">
      <Input
        label={label}
        value={value}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        keyboardType={keyboardType as any}
        autoCapitalize={autoCapitalize}
        error={showError ? error : undefined}
        onChangeText={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        disabled={disabled}
        required={required}
        id={name}
        testID={testID}
      />
    </YStack>
  );
};

export default FormField;
