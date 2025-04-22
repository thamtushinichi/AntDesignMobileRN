// src/store/zustand/formStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Generic form state management with Zustand
 * This is an alternative to the useForm hook using Zustand
 */

type ValidationFunction<T> = (values: T) => Partial<Record<keyof T, string>>;

export interface FormState<T extends Record<string, any>> {
  // Form state
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;

  // Form actions
  setValues: (values: Partial<T>) => void;
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setTouched: (touched: Partial<Record<keyof T, boolean>>) => void;
  setFieldTouched: (field: keyof T, isTouched?: boolean) => void;
  setErrors: (errors: Partial<Record<keyof T, string>>) => void;
  setFieldError: (field: keyof T, error: string | null) => void;
  validateField: (field: keyof T) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  submitForm: (onSubmit: (values: T) => void | Promise<void>) => Promise<void>;
  handleChange: <K extends keyof T>(field: K) => (value: T[K]) => void;
  handleBlur: (field: keyof T) => () => void;
}

/**
 * Creates a form store with Zustand and Immer
 *
 * @param initialValues Initial form values
 * @param validate Optional validation function
 * @returns Zustand store with form state and actions
 */
export function createFormStore<T extends Record<string, any>>(
  initialValues: T,
  validate?: ValidationFunction<T>,
  storeOptions?: { name?: string, persist?: boolean }
) {
  // Define the initial state
  const initialState: FormState<T> = {
    // Form state
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
    isDirty: false,

    // Action stubs - these will be implemented later
    setValues: () => {},
    setValue: () => {},
    setTouched: () => {},
    setFieldTouched: () => {},
    setErrors: () => {},
    setFieldError: () => {},
    validateField: () => {},
    validateForm: () => false,
    resetForm: () => {},
    submitForm: async () => {},
    handleChange: () => () => {},
    handleBlur: () => () => {},
  };

  // Create the base store with immer middleware
  let useFormStore;

  if (storeOptions?.persist) {
    // With persistence
    useFormStore = create<FormState<T>>()(
      persist(
        immer((set, get) => initialState),
        {
          name: storeOptions.name || 'form-store',
          storage: createJSONStorage(() => AsyncStorage),
        }
      )
    );
  } else {
    // Without persistence
    useFormStore = create<FormState<T>>()(
      immer((set, get) => initialState)
    );
  }

  // Implement form actions
  useFormStore.setState((state) => {
    // Set form values
    state.setValues = (values) => {
      state.values = {...state.values, ...values};
      state.isDirty = true;
      if (validate) {
        state.errors = validate(state.values);
        state.isValid = Object.keys(state.errors).length === 0;
      }
    };

    // Set a single field value
    state.setValue = (field, value) => {
      state.values[field] = value;
      state.isDirty = true;

      // Clear error when field is changed
      if (state.errors[field]) {
        delete state.errors[field];
      }

      // Run validation if validate function is provided
      if (validate) {
        const validationErrors = validate(state.values);
        if (validationErrors[field]) {
          state.errors[field] = validationErrors[field];
        }
        state.isValid = Object.keys(state.errors).length === 0;
      }
    };

    // Set touched fields
    state.setTouched = (touched) => {
      state.touched = {...state.touched, ...touched};
    };

    // Set a single field as touched
    state.setFieldTouched = (field, isTouched = true) => {
      state.touched[field] = isTouched;

      // Validate field when marked as touched
      if (isTouched && validate) {
        const validationErrors = validate(state.values);
        if (validationErrors[field]) {
          state.errors[field] = validationErrors[field];
        }
        state.isValid = Object.keys(state.errors).length === 0;
      }
    };

    // Set form errors
    state.setErrors = (errors) => {
      state.errors = errors;
      state.isValid = Object.keys(errors).length === 0;
    };

    // Set a single field error
    state.setFieldError = (field, error) => {
      if (error === null) {
        delete state.errors[field];
      } else {
        state.errors[field] = error;
      }
      state.isValid = Object.keys(state.errors).length === 0;
    };

    // Validate a single field
    state.validateField = (field) => {
      if (validate) {
        const validationErrors = validate(state.values);
        if (validationErrors[field]) {
          state.errors[field] = validationErrors[field];
        } else {
          delete state.errors[field];
        }
        state.isValid = Object.keys(state.errors).length === 0;
      }
    };

    // Validate the entire form
    state.validateForm = () => {
      if (validate) {
        const validationErrors = validate(state.values);
        state.errors = validationErrors;
        state.isValid = Object.keys(validationErrors).length === 0;
        return state.isValid;
      }
      return true;
    };

    // Reset form to initial values
    state.resetForm = () => {
      state.values = initialValues;
      state.errors = {};
      state.touched = {};
      state.isSubmitting = false;
      state.isValid = true;
      state.isDirty = false;
    };

    // Submit the form
    state.submitForm = async (onSubmit) => {
      // Mark all fields as touched
      const touchedFields: Record<keyof T, boolean> = {} as Record<keyof T, boolean>;
      Object.keys(state.values).forEach((key) => {
        touchedFields[key as keyof T] = true;
      });
      state.touched = touchedFields;

      // Validate form
      const isValid = state.validateForm();
      if (!isValid) {
        return;
      }

      try {
        state.isSubmitting = true;
        await onSubmit(state.values);
      } finally {
        state.isSubmitting = false;
      }
    };

    // Handle field change (returns a function that can be passed to onChange)
    state.handleChange = (field) => (value) => {
      state.setValue(field, value);
    };

    // Handle field blur (returns a function that can be passed to onBlur)
    state.handleBlur = (field) => () => {
      state.setFieldTouched(field, true);
    };
  });

  return useFormStore;
}
