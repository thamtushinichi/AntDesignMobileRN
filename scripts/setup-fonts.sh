#!/bin/bash

# setup-fonts.sh
# Font Setup Script for React Native + Tamagui
# Save this file as scripts/setup-fonts.sh

set -e

echo "🔤 Setting up Inter fonts for React Native + Tamagui..."

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p src/assets/fonts
mkdir -p scripts

# Check if we have curl
if ! command -v curl &> /dev/null; then
    echo "❌ curl is required but not installed. Please install curl first."
    exit 1
fi

# Download Inter font files from Google Fonts
echo "📥 Downloading Inter font files from Google Fonts..."

# Create a temporary directory for downloads
TMP_DIR="$(mktemp -d)"
trap "rm -rf $TMP_DIR" EXIT

# Download the Inter font zip file
INTER_ZIP_URL="https://fonts.google.com/download?family=Inter"
curl -L -o "$TMP_DIR/inter.zip" "$INTER_ZIP_URL"

# Extract fonts
echo "📦 Extracting fonts..."
cd "$TMP_DIR"
unzip -q inter.zip

# Find and copy the specific font files we need
declare -a target_fonts=(
    "Inter_18pt-Thin.ttf"
    "Inter_18pt-ExtraLight.ttf"
    "Inter_18pt-Light.ttf"
    "Inter_18pt-Regular.ttf"
    "Inter_18pt-Medium.ttf"
    "Inter_18pt-SemiBold.ttf"
    "Inter_18pt-Bold.ttf"
    "Inter_18pt-ExtraBold.ttf"
    "Inter_18pt-Black.ttf"
)

cd - > /dev/null

# Alternative: Download individual files if the zip doesn't work
if [ ! -f "$TMP_DIR/static/Inter_18pt-Regular.ttf" ]; then
    echo "📥 Downloading individual font files..."

    # GitHub raw URLs for Inter font files
    BASE_URL="https://github.com/rsms/inter/raw/master/docs/font-files"

    for font in "${target_fonts[@]}"; do
        echo "Downloading $font..."
        curl -L -o "$TMP_DIR/$font" "$BASE_URL/$font" || {
            echo "⚠️  Failed to download $font, skipping..."
            continue
        }
    done
else
    # Copy from extracted zip
    cp "$TMP_DIR"/static/Inter_18pt-*.ttf "$TMP_DIR/" 2>/dev/null || true
fi

# Copy fonts to our assets directory
echo "📋 Copying fonts to assets..."
for font in "${target_fonts[@]}"; do
    if [ -f "$TMP_DIR/$font" ]; then
        cp "$TMP_DIR/$font" "src/assets/fonts/"
        echo "✅ Copied $font"
    else
        echo "⚠️  $font not found, skipping..."
    fi
done

# Verify fonts were copied
FONT_COUNT=$(ls src/assets/fonts/*.ttf 2>/dev/null | wc -l)
if [ "$FONT_COUNT" -eq 0 ]; then
    echo "❌ No fonts were copied. Please download Inter fonts manually."
    echo "Visit: https://fonts.google.com/specimen/Inter"
    exit 1
fi

echo "✅ Successfully copied $FONT_COUNT font files"

# Install react-native-asset if not already installed
echo "🔧 Installing react-native-asset..."
if ! pnpm list react-native-asset &>/dev/null; then
    pnpm add -D react-native-asset
fi

# Link fonts
echo "🔗 Linking fonts to native projects..."
npx react-native-asset

# iOS specific setup
echo "📱 Setting up iOS..."
if [ -d "ios" ]; then
    # Find the Info.plist file
    INFO_PLIST=$(find ios -name "Info.plist" | head -1)

    if [ -n "$INFO_PLIST" ]; then
        echo "Updating $INFO_PLIST..."

        # Check if UIAppFonts already exists
        if ! plutil -extract UIAppFonts xml1 "$INFO_PLIST" &>/dev/null; then
            echo "Adding UIAppFonts array to Info.plist..."
            plutil -insert UIAppFonts -json '[]' "$INFO_PLIST"
        fi

        # Add each font to UIAppFonts
        for font in "${target_fonts[@]}"; do
            if [ -f "src/assets/fonts/$font" ]; then
                # Check if font is already in the list
                if ! plutil -extract UIAppFonts xml1 "$INFO_PLIST" | grep -q "$font"; then
                    plutil -insert UIAppFonts.0 -string "$font" "$INFO_PLIST" 2>/dev/null || true
                fi
            fi
        done

        echo "✅ iOS Info.plist updated"

        # Reinstall pods
        echo "🔄 Reinstalling iOS pods..."
        cd ios
        if [ -f "Gemfile" ]; then
            bundle exec pod install
        else
            pod install
        fi
        cd ..
    else
        echo "⚠️  Info.plist not found in ios directory"
    fi
else
    echo "⚠️  iOS directory not found"
fi

# Android specific setup
echo "🤖 Setting up Android..."
if [ -d "android" ]; then
    ANDROID_FONTS_DIR="android/app/src/main/assets/fonts"
    mkdir -p "$ANDROID_FONTS_DIR"

    # Copy fonts to Android assets
    cp src/assets/fonts/*.ttf "$ANDROID_FONTS_DIR/" 2>/dev/null || true

    ANDROID_FONT_COUNT=$(ls "$ANDROID_FONTS_DIR"/*.ttf 2>/dev/null | wc -l)
    echo "✅ Copied $ANDROID_FONT_COUNT fonts to Android assets"
else
    echo "⚠️  Android directory not found"
fi

echo ""
echo "🎉 Font setup complete!"
echo ""
echo "📋 Summary:"
echo "  - Downloaded and installed $FONT_COUNT Inter font files"
echo "  - Linked fonts to native projects"
echo "  - Updated iOS Info.plist"
echo "  - Copied fonts to Android assets"
echo ""
echo "🔄 Next steps:"
echo "  1. Clean and rebuild your project:"
echo "     pnpm clean:install"
echo ""
echo "  2. Or rebuild specific platforms:"
echo "     pnpm ios:clean && pnpm ios"
echo "     pnpm android:clean && pnpm android"
echo ""
echo "  3. Test fonts using the FontTest component"
echo ""
echo "💡 If fonts don't appear correctly:"
echo "  - Restart Metro bundler"
echo "  - Check that font files exist in src/assets/fonts/"
echo "  - Verify native project configuration"
echo "  - Test on both iOS and Android devices"
echo ""
echo "✨ Happy coding with beautiful typography!"
