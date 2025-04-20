# Ant Design Mobile RN Project

This is a React Native project using Ant Design Mobile RN, with TypeScript support. The project follows a structured architecture to ensure scalability and maintainability.

## Project Structure

```
AntDesignMobileRN/
├── android/                # Android configuration and source code
├── ios/                    # iOS configuration and source code
├── node_modules/           # Dependencies
├── src/                    # Main source code
│   ├── assets/             # Static resources
│   │   ├── fonts/          # Custom fonts
│   │   ├── images/         # Images
│   │   └── icons/          # Icons
│   ├── components/         # Reusable components
│   │   ├── common/         # Common components
│   │   ├── forms/          # Form-related components
│   │   └── layout/         # Layout components
│   ├── config/             # App configuration
│   ├── hooks/              # Custom React hooks
│   ├── navigation/         # Navigation setup
│   ├── screens/            # App screens
│   │   ├── auth/           # Authentication screens
│   │   ├── home/           # Home screens
│   │   └── profile/        # Profile screens
│   ├── services/           # API and services
│   ├── store/              # State management
│   │   ├── context/        # React Context API
│   │   └── reducers/       # Reducers if using Redux
│   ├── theme/              # Styling
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── App.tsx                 # Main App component
├── index.js                # Entry point
└── ...                     # Config files
```

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8.0
- JDK 11 or newer (for Android)
- Android Studio (for Android development)
- Xcode (for iOS development)
- CocoaPods (for iOS dependencies)

### Initial Setup

1. Clone the repository
2. Run the setup script to create the directory structure and install dependencies:

```sh
chmod +x setup.sh
./setup.sh
```

Alternatively, you can set up manually:

```sh
# Create the directory structure
mkdir -p src/assets/{fonts,images,icons}
mkdir -p src/components/{common,forms,layout}
mkdir -p src/config
mkdir -p src/hooks
mkdir -p src/navigation
mkdir -p src/screens/{auth,home,profile}
mkdir -p src/services
mkdir -p src/store/{context,reducers}
mkdir -p src/theme
mkdir -p src/types
mkdir -p src/utils

# Install dependencies
pnpm install

# For iOS, install CocoaPods dependencies
cd ios && bundle exec pod install && cd ..
```

### Running the App

Start the Metro development server:

```sh
pnpm start
```

Run on Android:

```sh
pnpm android
```

Run on iOS:

```sh
pnpm ios
```

## Key Features

- 🎨 **Ant Design Mobile RN** components
- 📱 **Responsive design** with dark/light theme support
- 🔒 **Authentication flow** with context API
- 📋 **Form validation** with custom hooks
- 🧭 **Navigation** with React Navigation v7
- 🎯 **TypeScript** for type safety
- 🛠️ **Modular architecture** for scalability

## Dependencies

- React Native 0.79.1
- Ant Design Mobile RN 5.4.0
- React Navigation 7
- AsyncStorage 2.1.2
- Vector Icons 10.2.0

## Notes

- This project uses pnpm as the package manager. If you prefer using npm or yarn, you need to remove the pnpm-lock.yaml file and run `npm install` or `yarn install`.
- The setup.sh script helps you create the necessary directory structure and install dependencies.
- For iOS development, remember to run `cd ios && bundle exec pod install` after adding new native dependencies.
