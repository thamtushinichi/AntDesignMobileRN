# Enhanced Ant Design Mobile RN Boilerplate

A modern, type-safe React Native boilerplate with Ant Design Mobile RN components, comprehensive form handling, theming system, and utility hooks.

## Features

- ✅ **React Native 0.79+** - Latest React Native version with improved architecture
- 🎨 **Ant Design Mobile RN** - Beautiful UI components based on Ant Design
- 📝 **TypeScript** - Type safety and improved developer experience
- 🔄 **Context API** - For global state management
- 🎯 **React Navigation 7** - Fully typed navigation with latest API
- 🧩 **Modular architecture** - Organized folder structure for scalability
- 🌓 **Light & Dark themes** - Complete theming system with design tokens
- 📋 **Advanced forms** - Form validation, error handling, and keyboard management
- 🔌 **API utilities** - Hooks for handling API requests with loading and error states
- 🚀 **Ready-to-use hooks** - Custom hooks for form validation, keyboard, and more
- 🛡️ **Safe storage** - AsyncStorage utilities for secure data persistence
- 📱 **Responsive design** - Adapts to different screen sizes
- 🧪 **Testing setup** - Jest configuration ready for unit testing

## Project Structure

```
src/
├── assets/                # Static resources (images, fonts, icons)
├── components/            # Reusable UI components
│   ├── common/            # Common UI components (buttons, cards, etc.)
│   ├── forms/             # Form-specific components
│   └── layout/            # Layout components
├── config/                # Application configuration
├── hooks/                 # Custom React hooks
│   ├── useApi.ts          # API request handling with loading/error states
│   ├── useForm.ts         # Form state management
│   ├── useKeyboard.ts     # Keyboard visibility and height
│   └── useValidation.ts   # Form validation logic
├── navigation/            # Navigation configuration
├── screens/               # App screens organized by feature
├── services/              # API clients and services
│   ├── api.ts             # Core API client
│   ├── authService.ts     # Authentication service
│   └── toastService.ts    # Toast notification service
├── store/                 # Global state management
│   └── context/           # React Context providers
├── theme/                 # Theming system
│   ├── colors.ts          # Color palette
│   ├── tokens.ts          # Design tokens (spacing, typography, etc.)
│   └── index.ts           # Theme exports
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
    ├── dateUtils.ts       # Date formatting and manipulation
    ├── keyboardUtils.ts   # Keyboard interaction utilities
    ├── networkUtils.ts    # Network connectivity utilities
    ├── storage.ts         # AsyncStorage wrapper
    └── validation.ts      # Validation utilities
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8.15.1
- CocoaPods (for iOS development)
- Xcode 14+ (for iOS development)
- Android Studio (for Android development)
- JDK 17 (for Android development)

### Installation

1. Clone the repository:

```bash
git clone https://your-repository-url.git
cd project-name
```

2. Install dependencies:

```bash
pnpm install
```

3. Install iOS dependencies:

```bash
cd ios && bundle install && bundle exec pod install && cd ..
```

### Running the App

#### Start Metro:

```bash
pnpm start
```

#### Run on iOS:

```bash
pnpm ios
```

#### Run on Android:

```bash
pnpm android
```

### Clean Installation

If you encounter any issues, you can try a clean installation:

```bash
pnpm clean:install
```

## Form System

The boilerplate includes a powerful form system built on top of custom hooks:

### Form Component

```tsx
<Form
  initialValues={{ email: '', password: '' }}
  onSubmit={handleSubmit}
  validate={validateForm}
>
  {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
    <>
      <FormField
        name="email"
        label="Email"
        value={values.email}
        onChange={(value) => handleChange('email', value)}
        onBlur={() => handleBlur('email')}
        error={errors.email}
        touched={touched.email}
        required
      />
      
      <Button 
        title="Submit" 
        onPress={handleSubmit} 
        fullWidth 
      />
    </>
  )}
</Form>
```

### Validation

Use the `useValidation` hook with predefined validators:

```tsx
const validateForm = useValidation({
  email: [
    validators.required('Email is required'),
    validators.email('Please enter a valid email')
  ],
  password: [
    validators.required('Password is required'),
    validators.minLength(8, 'Password must be at least 8 characters')
  ]
});
```

## Theming System

The theming system uses design tokens for consistent styling:

```tsx
// Access theme in components
const { theme } = useTheme();
const { colors, spacing, typography } = theme;

// Use theme properties in styles
const styles = StyleSheet.create({
  container: {
    padding: spacing.m,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text,
  },
});
```

## API Utilities

Make API requests with the `useApi` hook:

```tsx
const userApi = useApi(userService.getUser, {
  showSuccessToast: true,
  successMessage: 'User loaded successfully',
});

// In your component
const loadUser = async (userId) => {
  const user = await userApi.execute(userId);
  if (user) {
    // Handle success
  }
};

// Access loading and error states
if (userApi.loading) return <Loading />;
if (userApi.error) return <Error message={userApi.error.message} />;
```

## Toast Notifications

Display toast notifications with the toast service:

```tsx
import toastService from '../services/toastService';

// Show different types of toasts
toastService.success('Operation completed successfully');
toastService.error('An error occurred');
toastService.warning('Please check your input');
toastService.info('Information message');

// Show toast with custom duration
toastService.success('Custom duration', 5); // 5 seconds
```

## Custom Hooks

The boilerplate includes several useful custom hooks:

- `useForm`: Form state management
- `useValidation`: Form validation
- `useApi`: API request handling
- `useKeyboard`: Keyboard visibility and height tracking
- `useTheme`: Access to the theme system

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Ant Design Mobile RN](https://rn.mobile.ant.design/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
