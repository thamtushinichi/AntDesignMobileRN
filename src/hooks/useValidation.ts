import { useMemo } from 'react';

type ValidationRule<T = any> = {
  validator: (value: T, values?: Record<string, any>) => boolean;
  message: string;
};

type ValidationSchema<T extends Record<string, any>> = {
  [K in keyof T]?: ValidationRule[];
};

/**
 * Hook for form validation
 * Creates a validate function based on a validation schema
 *
 * @param schema Validation schema
 * @returns A validate function that can be used with useForm
 */
function useValidation<T extends Record<string, any>>(schema: ValidationSchema<T>) {
  return useMemo(() => {
    return (values: T) => {
      const errors: Partial<Record<keyof T, string>> = {};

      // Iterate through each field in the schema
      Object.entries(schema).forEach(([field, rules]) => {
        const fieldKey = field as keyof T;
        const value = values[fieldKey];

        // Skip if no rules for this field
        if (!rules || rules.length === 0) return;

        // Check each validation rule
        for (const rule of rules) {
          if (!rule.validator(value, values)) {
            errors[fieldKey] = rule.message;
            break; // Stop checking rules for this field once one fails
          }
        }
      });

      return errors;
    };
  }, [schema]);
}

// Common validators
export const validators = {
  /**
   * Check if a value is required (not empty)
   */
  required: (message = 'This field is required'): ValidationRule<any> => ({
    validator: (value) => {
      if (value === undefined || value === null) return false;
      if (typeof value === 'string') return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return true;
    },
    message,
  }),

  /**
   * Check if a value is a valid email
   */
  email: (message = 'Please enter a valid email address'): ValidationRule<string> => ({
    validator: (value) => {
      if (!value) return true; // Skip if empty (use required validator for required fields)
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    },
    message,
  }),

  /**
   * Check if a value has a minimum length
   */
  minLength: (min: number, message?: string): ValidationRule<string> => ({
    validator: (value) => {
      if (!value) return true; // Skip if empty
      return value.length >= min;
    },
    message: message || `Must be at least ${min} characters`,
  }),

  /**
   * Check if a value has a maximum length
   */
  maxLength: (max: number, message?: string): ValidationRule<string> => ({
    validator: (value) => {
      if (!value) return true; // Skip if empty
      return value.length <= max;
    },
    message: message || `Must be no more than ${max} characters`,
  }),

  /**
   * Check if a value matches a pattern
   */
  pattern: (regex: RegExp, message = 'Invalid format'): ValidationRule<string> => ({
    validator: (value) => {
      if (!value) return true; // Skip if empty
      return regex.test(value);
    },
    message,
  }),

  /**
   * Check if a value matches another field value
   */
  matches: (fieldName: string, message?: string): ValidationRule => ({
    validator: (value, values) => {
      if (!value || !values) return true;
      return value === values[fieldName];
    },
    message: message || `Must match ${fieldName}`,
  }),

  /**
   * Check if a value is a valid password
   * By default, requires at least 8 characters, one uppercase letter, one lowercase letter, and one number
   */
  password: (
    options: {
      minLength?: number;
      requireUppercase?: boolean;
      requireLowercase?: boolean;
      requireNumber?: boolean;
      requireSpecialChar?: boolean;
      message?: string;
    } = {}
  ): ValidationRule<string> => {
    const {
      minLength = 8,
      requireUppercase = true,
      requireLowercase = true,
      requireNumber = true,
      requireSpecialChar = false,
      message = 'Password must be at least 8 characters with uppercase, lowercase, and digit',
    } = options;

    return {
      validator: (value) => {
        if (!value) return true; // Skip if empty

        if (value.length < minLength) return false;
        if (requireUppercase && !/[A-Z]/.test(value)) return false;
        if (requireLowercase && !/[a-z]/.test(value)) return false;
        if (requireNumber && !/[0-9]/.test(value)) return false;
        if (requireSpecialChar && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value)) return false;

        return true;
      },
      message,
    };
  },

  /**
   * Check if a value is a valid number
   */
  number: (message = 'Must be a valid number'): ValidationRule<string> => ({
    validator: (value) => {
      if (!value) return true; // Skip if empty
      return !isNaN(Number(value));
    },
    message,
  }),

  /**
   * Check if a number is within a range
   */
  range: (min: number, max: number, message?: string): ValidationRule<string | number> => ({
    validator: (value) => {
      if (value === undefined || value === null || value === '') return true; // Skip if empty
      const num = typeof value === 'string' ? Number(value) : value;
      return !isNaN(num) && num >= min && num <= max;
    },
    message: message || `Must be between ${min} and ${max}`,
  }),
};

export default useValidation;
