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

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const {login} = useAuth();
  const {colors} = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validate = (): boolean => {
    const newErrors: {email?: string; password?: string} = {};

    if (validation.isEmpty(email)) {
      newErrors.email = 'Email is required';
    } else if (!validation.isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (validation.isEmpty(password)) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      Toast.success('Login successful!', 1);
    } catch (error) {
      console.error('Login error:', error);
      Toast.fail('Login failed. Please check your credentials and try again.', 2);
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
              <Text style={[styles.title, {color: colors.text}]}>Welcome Back</Text>
              <Text style={[styles.subtitle, {color: colors.text}]}>
                Sign in to continue
              </Text>
            </View>

            <WhiteSpace size="xl" />

            <View style={styles.formContainer}>
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

              <WhiteSpace size="xl" />

              <Button
                type="primary"
                loading={loading}
                disabled={loading}
                onPress={handleLogin}>
                Login
              </Button>

              <WhiteSpace size="lg" />

              <View style={styles.registerContainer}>
                <Text style={{color: colors.text}}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={[styles.registerText, {color: colors.primary}]}>
                    Register now
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
