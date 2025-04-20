import {useState, useCallback} from 'react';

type ValidationFunction<T> = (values: T) => Partial<Record<keyof T, string>>;

interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validate?: ValidationFunction<T>;
}

interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  handleChange: <K extends keyof T>(field: K, value: T[K]) => void;
  handleBlur: (field: keyof T) => void;
  handleSubmit: () => void;
  reset: () => void;
  isSubmitting: boolean;
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setFieldError: <K extends keyof T>(field: K, error: string) => void;
  setFieldTouched: (field: keyof T, isTouched?: boolean) => void;
}

function useForm<T extends Record<string, any>>({
                                                  initialValues,
                                                  onSubmit,
                                                  validate,
                                                }: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues(prev => ({...prev, [field]: value}));

    // Clear error when field is changed
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({...prev, [field]: true}));

    // Run validation for field on blur if validate function is provided
    if (validate) {
      const validationErrors = validate(values);
      if (validationErrors[field]) {
        setErrors(prev => ({...prev, [field]: validationErrors[field]}));
      }
    }
  }, [values, validate]);

  const setFieldValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues(prev => ({...prev, [field]: value}));
  }, []);

  const setFieldError = useCallback(<K extends keyof T>(field: K, error: string) => {
    setErrors(prev => ({...prev, [field]: error}));
  }, []);

  const setFieldTouched = useCallback((field: keyof T, isTouched = true) => {
    setTouched(prev => ({...prev, [field]: isTouched}));
  }, []);

  const handleSubmit = useCallback(async () => {
    // Mark all fields as touched
    const touchedFields = Object.keys(values).reduce(
      (acc, key) => ({...acc, [key]: true}),
      {} as Record<keyof T, boolean>
    );
    setTouched(touchedFields);

    // Validate all fields if validate function is provided
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);

      // If there are errors, don't submit
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    isSubmitting,
    setFieldValue,
    setFieldError,
    setFieldTouched,
  };
}

export default useForm;
