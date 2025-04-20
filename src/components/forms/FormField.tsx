import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { InputItem } from '@ant-design/react-native';
import { useTheme } from '../../store/context/ThemeContext';

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
  style?: ViewStyle;
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
                                               style,
                                               required = false,
                                             }) => {
  const { theme } = useTheme();
  const { colors } = theme;

  // Only show error if field has been touched
  const showError = touched && error;

  return (
    <View style={[styles.container, style]} testID={`field-${name}`}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: colors.text }]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}

      <InputItem
        type={secureTextEntry ? 'password' : keyboardType === 'email-address' ? 'email' : 'text'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        error={!!showError}
        disabled={disabled}
        clear
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        testID={testID}
        style={{ color: colors.text }}
        placeholderTextColor={colors.placeholder}
      />

      {showError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 6,
    marginLeft: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  required: {
    color: '#f5222d',
  },
  errorText: {
    color: '#f5222d',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 15,
  },
});

export default FormField;
