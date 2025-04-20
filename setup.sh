#!/bin/bash

# Create source directory structure
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

# Install pnpm if not installed
if ! command -v pnpm &> /dev/null; then
  echo "pnpm is not installed, installing..."
  npm install -g pnpm
fi

# Install dependencies using pnpm
pnpm install

# Link vector icons for iOS
cd ios && bundle exec pod install && cd ..

# Create font directories to prevent build errors
mkdir -p android/app/src/main/assets/fonts

# Copy vector icon fonts
cp -r node_modules/react-native-vector-icons/Fonts/* android/app/src/main/assets/fonts/

echo "Setup completed successfully!"
echo "Run 'pnpm start' to start the Metro server"
echo "Run 'pnpm android' or 'pnpm ios' to run on a device or simulator"
