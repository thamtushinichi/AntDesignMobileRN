// src/components/FontTest.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { YStack, Text as TamaguiText } from 'tamagui';
import { getFontFamily, fontFamily } from '../config/fonts';

const FontTest = () => {
  return (
    <YStack padding="$md" space="$md">
      {/* Test với React Native Text */}
      <YStack space="$sm">
        <TamaguiText fontSize="$lg" fontWeight="bold">React Native Text Tests:</TamaguiText>

        <Text style={[styles.text, { fontFamily: getFontFamily(300) }]}>
          Inter Light (300) - Hello World
        </Text>
        <Text style={[styles.text, { fontFamily: getFontFamily(400) }]}>
          Inter Regular (400) - Hello World
        </Text>
        <Text style={[styles.text, { fontFamily: getFontFamily(500) }]}>
          Inter Medium (500) - Hello World
        </Text>
        <Text style={[styles.text, { fontFamily: getFontFamily(600) }]}>
          Inter SemiBold (600) - Hello World
        </Text>
        <Text style={[styles.text, { fontFamily: getFontFamily(700) }]}>
          Inter Bold (700) - Hello World
        </Text>
        <Text style={[styles.text, { fontFamily: getFontFamily(800) }]}>
          Inter ExtraBold (800) - Hello World
        </Text>
        <Text style={[styles.text, { fontFamily: getFontFamily(900) }]}>
          Inter Black (900) - Hello World
        </Text>
      </YStack>

      {/* Test với Tamagui Text */}
      <YStack space="$sm" marginTop="$lg">
        <TamaguiText fontSize="$lg" fontWeight="bold">Tamagui Text Tests:</TamaguiText>

        <TamaguiText fontFamily={fontFamily.inter.light} fontSize="$md">
          Tamagui Inter Light - Hello World
        </TamaguiText>
        <TamaguiText fontFamily={fontFamily.inter.regular} fontSize="$md">
          Tamagui Inter Regular - Hello World
        </TamaguiText>
        <TamaguiText fontFamily={fontFamily.inter.medium} fontSize="$md">
          Tamagui Inter Medium - Hello World
        </TamaguiText>
        <TamaguiText fontFamily={fontFamily.inter.semiBold} fontSize="$md">
          Tamagui Inter SemiBold - Hello World
        </TamaguiText>
        <TamaguiText fontFamily={fontFamily.inter.bold} fontSize="$md">
          Tamagui Inter Bold - Hello World
        </TamaguiText>
        <TamaguiText fontFamily={fontFamily.inter.extraBold} fontSize="$md">
          Tamagui Inter ExtraBold - Hello World
        </TamaguiText>
        <TamaguiText fontFamily={fontFamily.inter.black} fontSize="$md">
          Tamagui Inter Black - Hello World
        </TamaguiText>
      </YStack>

      {/* Test Tamagui font weights */}
      <YStack space="$sm" marginTop="$lg">
        <TamaguiText fontSize="$lg" fontWeight="bold">Tamagui Font Weights:</TamaguiText>

        <TamaguiText fontWeight="1" fontSize="$md">Weight 1 (300) - Hello World</TamaguiText>
        <TamaguiText fontWeight="2" fontSize="$md">Weight 2 (400) - Hello World</TamaguiText>
        <TamaguiText fontWeight="3" fontSize="$md">Weight 3 (500) - Hello World</TamaguiText>
        <TamaguiText fontWeight="4" fontSize="$md">Weight 4 (600) - Hello World</TamaguiText>
        <TamaguiText fontWeight="5" fontSize="$md">Weight 5 (700) - Hello World</TamaguiText>
        <TamaguiText fontWeight="6" fontSize="$md">Weight 6 (800) - Hello World</TamaguiText>
        <TamaguiText fontWeight="7" fontSize="$md">Weight 7 (900) - Hello World</TamaguiText>
      </YStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: 8,
    color: '#121638',
  },
});

export default FontTest;
