import React from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {InputItem} from '@ant-design/react-native';
import {useTheme} from '../../store/context/ThemeContext';

interface FormFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
  maxLength?: number;
  disabled?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  testID?: string;
  style?: ViewStyle;
}

const FormField: React.FC<FormFieldProps> = ({
                                               label,
                                               value,
                                               onChange,
                                               placeholder,
                                               error,
                                               secureTextEntry = false,
                                               keyboardType = 'default',
                                               maxLength,
                                               disabled = false,
                                               autoCapitalize = 'none',
                                               testID,
                                               style,
                                             }) => {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={[styles.label, {color: colors.text}]}>{label}</Text>}
      <InputItem
        type={secureTextEntry ? 'password' : keyboardType === 'email-address' ? 'email' : 'text'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={!!error}
        disabled={disabled}
        clear
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        testID={testID}
        style={{color: colors.text}}
        placeholderTextColor={colors.placeholder}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    marginLeft: 15,
  },
  errorText: {
    color: '#f5222d',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 15,
  },
});

export default FormField;
