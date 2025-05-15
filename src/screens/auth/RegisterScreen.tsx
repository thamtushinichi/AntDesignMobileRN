// src/screens/auth/RegisterScreen.tsx
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { YStack, XStack, Text } from 'tamagui';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { Form, FormField } from '../../components/forms';
import { Button } from '../../components/ui';
import useValidation, { validators } from '../../hooks/useValidation';
import useApi from '../../hooks/useApi';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useAuthStore } from '../../store/zustand';
import { toastService } from '../../components/ui';
import authService from '../../services/authService';

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
};

// Form values type
interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { register, isLoading } = useAuthStore();
  const { keyboardVisible } = useKeyboard();

  // Create register API hook
  const registerApi = useApi(
    async (username: string, email: string, password: string) => {
      try {
        const success = await register(username, email, password);
        if (success) {
          toastService.success('Registration successful!');
        } else {
          toastService.error('Registration failed. Please try again later.');
        }
        return success;
      } catch (error) {
        toastService.error('An error occurred during registration.');
        throw error;
      }
    },
    {
      showSuccessToast: false, // We'll handle toasts manually
      showErrorToast: false,
    }
  );

  // Create form validation schema
  const validateRegister = useValidation<RegisterFormValues>({
    username: [
      validators.required('Username is required'),
      validators.minLength(3, 'Username must be at least 3 characters'),
      validators.maxLength(20, 'Username must be at most 20 characters'),
    ],
    email: [
      validators.required('Email is required'),
      validators.email('Please enter a valid email address'),
    ],
    password: [
      validators.required('Password is required'),
      validators.password(),
    ],
    confirmPassword: [
      validators.required('Please confirm your password'),
      validators.matches('password', 'Passwords must match'),
    ],
  });

  // Handle register form submission
  const handleRegister = async (values: RegisterFormValues) => {
    await registerApi.execute(
      values.username,
      values.email,
      values.password
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            padding: 16,
            paddingBottom: keyboardVisible ? 20 : 16,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <YStack padding="$md">
            <YStack alignItems="center" marginBottom="$lg">
              <Text fontSize="$2xl" fontWeight="bold" marginBottom="$sm">
                Create Account
              </Text>
              <Text fontSize="$md" color="$textMuted">
                Sign up to get started
              </Text>
            </YStack>

            <YStack space="$xl">
              <Form
                initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
                onSubmit={handleRegister}
                validate={validateRegister}
              >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                  <YStack space="$lg">
                    <FormField
                      name="username"
                      label="Username"
                      value={values.username}
                      onChange={(value) => handleChange('username', value)}
                      onBlur={() => handleBlur('username')}
                      placeholder="Enter your username"
                      error={errors.username}
                      touched={touched.username}
                      autoCapitalize="none"
                      required
                    />

                    <FormField
                      name="email"
                      label="Email"
                      value={values.email}
                      onChange={(value) => handleChange('email', value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="Enter your email"
                      error={errors.email}
                      touched={touched.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      required
                    />

                    <FormField
                      name="password"
                      label="Password"
                      value={values.password}
                      onChange={(value) => handleChange('password', value)}
                      onBlur={() => handleBlur('password')}
                      placeholder="Enter your password"
                      error={errors.password}
                      touched={touched.password}
                      secureTextEntry
                      required
                    />

                    <FormField
                      name="confirmPassword"
                      label="Confirm Password"
                      value={values.confirmPassword}
                      onChange={(value) => handleChange('confirmPassword', value)}
                      onBlur={() => handleBlur('confirmPassword')}
                      placeholder="Confirm your password"
                      error={errors.confirmPassword}
                      touched={touched.confirmPassword}
                      secureTextEntry
                      required
                    />

                    <Button
                      variant="primary"
                      disabled={isSubmitting || registerApi.loading || isLoading}
                      loading={isSubmitting || registerApi.loading || isLoading}
                      onPress={() => handleSubmit()}
                      fullWidth
                    >
                      Register
                    </Button>
                  </YStack>
                )}
              </Form>

              <XStack justifyContent="center" alignItems="center">
                <Text color="$textMuted">Already have an account? </Text>
                <Text
                  color="$primary"
                  fontWeight="bold"
                  onPress={() => navigation.navigate('Login')}
                  pressStyle={{ opacity: 0.7 }}
                >
                  Login
                </Text>
              </XStack>
            </YStack>
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
