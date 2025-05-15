// src/screens/auth/LoginScreen.tsx
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { YStack, XStack, Text, View } from 'tamagui';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { Form, FormField } from '../../components/forms';
import { Button } from '../../components/ui';
import useValidation, { validators } from '../../hooks/useValidation';
import useApi from '../../hooks/useApi';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useAuthStore } from '../../store/zustand';
import { toastService } from '../../components/ui';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

// Form values type
interface LoginFormValues {
  email: string;
  password: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  // Use Zustand stores
  const { login, isLoading } = useAuthStore();
  const { keyboardVisible } = useKeyboard();

  // Create form validation schema
  const validateLogin = useValidation<LoginFormValues>({
    email: [
      validators.required('Email is required'),
      validators.email('Please enter a valid email address'),
    ],
    password: [
      validators.required('Password is required'),
    ],
  });

  // Create login API hook
  const loginApi = useApi(
    async (email: string, password: string) => {
      try {
        const success = await login(email, password);
        if (success) {
          toastService.success('Login successful!');
        } else {
          toastService.error('Login failed. Please check your credentials and try again.');
        }
        return success;
      } catch (error) {
        toastService.error('An error occurred during login.');
        throw error;
      }
    },
    {
      showSuccessToast: false, // We'll handle toasts manually
      showErrorToast: false,
    }
  );

  // Handle login form submission
  const handleLogin = async (values: LoginFormValues) => {
    await loginApi.execute(values.email, values.password);
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
                Welcome Back
              </Text>
              <Text fontSize="$md" color="$textMuted">
                Sign in to continue
              </Text>
            </YStack>

            <YStack space="$xl">
              <Form
                initialValues={{ email: '', password: '' }}
                onSubmit={handleLogin}
                validate={validateLogin}
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

                    <Button
                      variant="primary"
                      disabled={isSubmitting || loginApi.loading || isLoading}
                      loading={isSubmitting || loginApi.loading || isLoading}
                      onPress={() => handleSubmit()}
                      fullWidth
                    >
                      Login
                    </Button>
                  </YStack>
                )}
              </Form>

              <XStack justifyContent="center" alignItems="center">
                <Text color="$textMuted">Don't have an account? </Text>
                <Text
                  color="$primary"
                  fontWeight="bold"
                  onPress={() => navigation.navigate('Register')}
                  pressStyle={{ opacity: 0.7 }}
                >
                  Register now
                </Text>
              </XStack>
            </YStack>
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
