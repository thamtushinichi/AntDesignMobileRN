// src/components/forms/Form.tsx
import React, { ReactNode } from 'react';
import { YStack } from 'tamagui';
import useForm from '../../hooks/useForm';

export type FormValues = Record<string, any>;

interface FormProps<T extends FormValues> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  children: (formProps: {
    values: T;
    errors: Partial<Record<keyof T, string>>;
    touched: Partial<Record<keyof T, boolean>>;
    handleChange: <K extends keyof T>(field: K, value: T[K]) => void;
    handleBlur: (field: keyof T) => void;
    handleSubmit: () => void;
    isSubmitting: boolean;
    setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
    setFieldError: <K extends keyof T>(field: K, error: string) => void;
    setFieldTouched: (field: keyof T, isTouched?: boolean) => void;
  }) => ReactNode;
}

function Form<T extends FormValues>({
                                      initialValues,
                                      onSubmit,
                                      validate,
                                      children,
                                    }: FormProps<T>) {
  const formProps = useForm<T>({
    initialValues,
    onSubmit,
    validate,
  });

  return <YStack width="100%">{children(formProps)}</YStack>;
}

export default Form;
