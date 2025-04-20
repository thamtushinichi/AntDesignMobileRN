/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 * Password validation regex
 * Must contain at least one lowercase letter, one uppercase letter, one digit,
 * and be at least 8 characters long
 */
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

/**
 * Validation utility functions
 */
const validation = {
  /**
   * Validate an email address
   * @param email Email to validate
   */
  isValidEmail: (email: string): boolean => {
    return EMAIL_REGEX.test(email);
  },

  /**
   * Validate a password
   * @param password Password to validate
   */
  isValidPassword: (password: string): boolean => {
    return PASSWORD_REGEX.test(password);
  },

  /**
   * Check if a string is empty
   * @param value String to check
   */
  isEmpty: (value: string): boolean => {
    return !value || value.trim().length === 0;
  },

  /**
   * Check if a string has minimum length
   * @param value String to check
   * @param minLength Minimum length
   */
  hasMinLength: (value: string, minLength: number): boolean => {
    return value && value.length >= minLength;
  },

  /**
   * Check if a string has maximum length
   * @param value String to check
   * @param maxLength Maximum length
   */
  hasMaxLength: (value: string, maxLength: number): boolean => {
    return value && value.length <= maxLength;
  },

  /**
   * Check if two values match
   * @param value1 First value
   * @param value2 Second value
   */
  doValuesMatch: (value1: string, value2: string): boolean => {
    return value1 === value2;
  },
};

export default validation;
