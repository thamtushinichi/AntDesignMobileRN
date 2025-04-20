import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { WhiteSpace, WingBlank } from '@ant-design/react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../store/context/AuthContext';
import { useTheme } from '../../store/context/ThemeContext';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { Form, FormField } from '../../components/forms';
import { Button } from '../../components/common';
import useValidation, { validators } from '../../hooks/useValidation';
import useApi from '../../hooks/useApi';
import authService from '../../services/authService';
import toastService from '../../services/toastService';
import { useKeyboard } from '../../hooks/useKeyboard';

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
  const { register } = useAuth();
  const { theme } = useTheme();
  const { colors } = theme;
  const { keyboardVisible } = useKeyboard();

  // Create register API hook
  const registerApi = useApi(authService.register, {
    showSuccessToast: true,
    successMessage: 'Registration successful!',
    showErrorToast: true,
    errorMessage: 'Registration failed. Please try again later.',
  });

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
    const result = await registerApi.execute(
      values.username,
      values.email,
      values.password
    );

    if (result) {
      try {
        await register(values.username, values.email, values.password);
      } catch (error) {
        console.error('Register context error:', error);
        toastService.error('An error occurred while registering.');
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            // Adjust padding when keyboard is visible
            keyboardVisible && { paddingBottom: 20 }
          ]}
          keyboardShouldPersistTaps="handled">
          <WingBlank size="lg">
            <View style={styles.headerContainer}>
              <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Sign up to get started
              </Text>
            </View>

            <WhiteSpace size="xl" />

            <Form
              initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
              onSubmit={handleRegister}
              validate={validateRegister}>
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <View style={styles.formContainer}>
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

                  <WhiteSpace size="lg" />

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

                  <WhiteSpace size="lg" />

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

                  <WhiteSpace size="lg" />

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

                  <WhiteSpace size="xl" />

                  <Button
                    title="Register"
                    type="primary"
                    loading={isSubmitting || registerApi.loading}
                    disabled={isSubmitting || registerApi.loading}
                    onPress={handleSubmit}
                    fullWidth
                  />

                  <WhiteSpace size="lg" />

                  <View style={styles.loginContainer}>
                    <Text style={{ color: colors.textSecondary }}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                      <Text style={[styles.loginText, { color: colors.primary }]}>
                        Login
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Form>
          </WingBlank>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  formContainer: {
    marginTop: 20,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
