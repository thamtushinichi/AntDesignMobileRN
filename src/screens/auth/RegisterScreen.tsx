import React, {useState} from 'react';
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
import {
  InputItem,
  Button,
  WhiteSpace,
  WingBlank,
  Toast,
} from '@ant-design/react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAuth} from '../../store/context/AuthContext';
import {useTheme} from '../../store/context/ThemeContext';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import validation from '../../utils/validation';

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation}) => {
  const {register} = useAuth();
  const {colors} = useTheme();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = (): boolean => {
    const newErrors: {
      username?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (validation.isEmpty(username)) {
      newErrors.username = 'Username is required';
    } else if (!validation.hasMinLength(username, 3)) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (validation.isEmpty(email)) {
      newErrors.email = 'Email is required';
    } else if (!validation.isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (validation.isEmpty(password)) {
      newErrors.password = 'Password is required';
    } else if (!validation.isValidPassword(password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and digit';
    }

    if (validation.isEmpty(confirmPassword)) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (!validation.doValuesMatch(password, confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      await register(username, email, password);
      Toast.success('Registration successful!', 1);
    } catch (error) {
      console.error('Registration error:', error);
      Toast.fail('Registration failed. Please try again later.', 2);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.background}]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <WingBlank size="lg">
            <View style={styles.headerContainer}>
              <Text style={[styles.title, {color: colors.text}]}>Create Account</Text>
              <Text style={[styles.subtitle, {color: colors.text}]}>
                Sign up to get started
              </Text>
            </View>

            <WhiteSpace size="xl" />

            <View style={styles.formContainer}>
              <InputItem
                clear
                error={!!errors.username}
                value={username}
                onChange={setUsername}
                labelNumber={5}
                placeholder="Username"
                placeholderTextColor={colors.placeholder}
                style={{color: colors.text}}
              />
              {errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
              )}

              <WhiteSpace size="lg" />

              <InputItem
                clear
                error={!!errors.email}
                value={email}
                onChange={setEmail}
                labelNumber={5}
                placeholder="Email"
                placeholderTextColor={colors.placeholder}
                style={{color: colors.text}}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <WhiteSpace size="lg" />

              <InputItem
                clear
                type="password"
                error={!!errors.password}
                value={password}
                onChange={setPassword}
                labelNumber={5}
                placeholder="Password"
                placeholderTextColor={colors.placeholder}
                style={{color: colors.text}}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <WhiteSpace size="lg" />

              <InputItem
                clear
                type="password"
                error={!!errors.confirmPassword}
                value={confirmPassword}
                onChange={setConfirmPassword}
                labelNumber={5}
                placeholder="Confirm Password"
                placeholderTextColor={colors.placeholder}
                style={{color: colors.text}}
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}

              <WhiteSpace size="xl" />

              <Button
                type="primary"
                loading={loading}
                disabled={loading}
                onPress={handleRegister}>
                Register
              </Button>

              <WhiteSpace size="lg" />

              <View style={styles.loginContainer}>
                <Text style={{color: colors.text}}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={[styles.loginText, {color: colors.primary}]}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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
  errorText: {
    color: '#f5222d',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 15,
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
