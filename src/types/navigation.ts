// src/types/navigation.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
// Auth Navigator Param List
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// App Navigator Param List
export type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  ProductDetails: { productId: string };
};

// Combined Navigation Types
export type RootStackParamList = AuthStackParamList & AppStackParamList;

// Navigation Props Types
export type AuthScreenNavigationProp<T extends keyof AuthStackParamList> =
  NativeStackNavigationProp<AuthStackParamList, T>;

export type AppScreenNavigationProp<T extends keyof AppStackParamList> =
  NativeStackNavigationProp<AppStackParamList, T>;

export type AuthScreenRouteProp<T extends keyof AuthStackParamList> =
  RouteProp<AuthStackParamList, T>;

export type AppScreenRouteProp<T extends keyof AppStackParamList> =
  RouteProp<AppStackParamList, T>;

// Combined props for screens
export interface AuthScreenProps<T extends keyof AuthStackParamList> {
  navigation: AuthScreenNavigationProp<T>;
  route: AuthScreenRouteProp<T>;
}

export interface AppScreenProps<T extends keyof AppStackParamList> {
  navigation: AppScreenNavigationProp<T>;
  route: AppScreenRouteProp<T>;
}
