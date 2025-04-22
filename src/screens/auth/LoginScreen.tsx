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
import {WhiteSpace, WingBlank, Button} from '@ant-design/react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import {Form, FormField} from '../../components/forms';
import useValidation, {validators} from '../../hooks/useValidation';
import useApi from '../../hooks/useApi';
import {useKeyboard} from '../../hooks/useKeyboard';
import {useAuthStore, useThemeStore, selectTheme} from '../../store/zustand';
import toastService from '../../services/toastService';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

// Form values type
interface LoginFormValues {
  email: string;
  password: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  // Use Zustand stores instead of context
  const {login, isLoading} = useAuthStore();
  const {antColors} = useThemeStore(selectTheme);
  const {keyboardVisible} = useKeyboard();

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
    console.log(values);
    await loginApi.execute(values.email, values.password);
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: antColors.card_background}]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            // Adjust padding when keyboard is visible
            keyboardVisible && {paddingBottom: 20}
          ]}
          keyboardShouldPersistTaps="handled">
          <WingBlank size="lg">
            <View style={styles.headerContainer}>
              <Text style={[styles.title, {color: antColors.color_text_base}]}>Welcome Back</Text>
              <Text style={[styles.subtitle, {color: antColors.color_text_secondary}]}>
                Sign in to continue
              </Text>
            </View>

            <WhiteSpace size="xl"/>

            <Form
              initialValues={{email: '', password: ''}}
              onSubmit={handleLogin}
              validate={validateLogin}>
              {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
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

                  <WhiteSpace size="lg"/>

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

                  <WhiteSpace size="xl"/>

                  <Button
                    type="primary"
                    loading={isSubmitting || loginApi.loading || isLoading}
                    disabled={isSubmitting || loginApi.loading || isLoading}
                    onPress={handleSubmit}
                  >
                    Login
                  </Button>

                  <WhiteSpace size="lg"/>

                  <View style={styles.registerContainer}>
                    <Text style={{color: antColors.color_text_secondary}}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                      <Text style={[styles.registerText, {color: antColors.brand_primary}]}>
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
