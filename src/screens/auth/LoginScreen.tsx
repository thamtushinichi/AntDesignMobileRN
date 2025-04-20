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

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

// Form values type
interface LoginFormValues {
  email: string;
  password: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const { login } = useAuth();
  const { theme } = useTheme();
  const { colors } = theme;
  const { keyboardVisible } = useKeyboard();

  // Create login API hook
  const loginApi = useApi(authService.login, {
    showSuccessToast: true,
    successMessage: 'Login successful!',
    showErrorToast: true,
    errorMessage: 'Login failed. Please check your credentials and try again.',
  });

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

  // Handle login form submission
  const handleLogin = async (values: LoginFormValues) => {
    const result = await loginApi.execute(values.email, values.password);
    if (result) {
      try {
        await login(values.email, values.password);
      } catch (error) {
        console.error('Login context error:', error);
        toastService.error('An error occurred while logging in.');
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
              <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Sign in to continue
              </Text>
            </View>

            <WhiteSpace size="xl" />

            <Form
              initialValues={{ email: '', password: '' }}
              onSubmit={handleLogin}
              validate={validateLogin}>
              {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <View style={styles.formContainer}>
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

                  <WhiteSpace size="xl" />

                  <Button
                    title="Login"
                    type="primary"
                    loading={isSubmitting || loginApi.loading}
                    disabled={isSubmitting || loginApi.loading}
                    onPress={handleSubmit}
                    fullWidth
                  />

                  <WhiteSpace size="lg" />

                  <View style={styles.registerContainer}>
                    <Text style={{ color: colors.textSecondary }}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                      <Text style={[styles.registerText, { color: colors.primary }]}>
                        Register now
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
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  registerText: {
    fontWeight: 'bold',
  },
});

export default LoginScreen;
