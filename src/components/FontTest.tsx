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

        <Text style={[styles.text, { fontFamily: 'Inter-Thin' }]}>
          Inter Thin (100) - Hello World
        </Text>
        <Text style={[styles.text, { fontFamily: 'Inter-ExtraLight' }]}>
          Inter ExtraLight (200) - Hello World
        </Text>
        <Text style={[styles.text, { fontFamily: 'Inter-Light' }]}>
          Inter Light (300) - Hello World
        </Text>
        <Text style={[styles.text, { fontFamily: 'Inter-Regular' }]}>
          Inter Regular (400) - Hello World
        </Text>
        <Text style={[styles.text, { fontFamily: 'Inter-Medium' }]}>
          Inter Medium (500) - Hello World
        </Text>
        <Text style={[styles.text, { fontFamily: 'Inter-SemiBold' }]}>
          Inter SemiBold (600) - Hello World
        </Text>
        <Text style={[styles.text, { fontFamily: 'Inter-Bold' }]}>
          Inter Bold (700) - Hello World
        </Text>
        <Text style={[styles.text, { fontFamily: 'Inter-ExtraBold' }]}>
          Inter ExtraBold (800) - Hello World
        </Text>
        <Text style={[styles.text, { fontFamily: 'Inter-Black' }]}>
          Inter Black (900) - Hello World
        </Text>
      </YStack>

      {/* Test với Tamagui Text */}
      <YStack space="$sm" marginTop="$lg">
        <TamaguiText fontSize="$lg" fontWeight="bold">Tamagui Text Tests:</TamaguiText>

        <TamaguiText fontFamily={fontFamily.inter.thin} fontSize="$md">
          Tamagui Inter Thin - Hello World
        </TamaguiText>
        <TamaguiText fontFamily={fontFamily.inter.extraLight} fontSize="$md">
          Tamagui Inter ExtraLight - Hello World
        </TamaguiText>
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

        <TamaguiText fontWeight="1" fontSize="$md">Weight 1 (Thin) - Hello World</TamaguiText>
        <TamaguiText fontWeight="2" fontSize="$md">Weight 2 (Regular) - Hello World</TamaguiText>
        <TamaguiText fontWeight="3" fontSize="$md">Weight 3 (Medium) - Hello World</TamaguiText>
        <TamaguiText fontWeight="4" fontSize="$md">Weight 4 (SemiBold) - Hello World</TamaguiText>
        <TamaguiText fontWeight="5" fontSize="$md">Weight 5 (Bold) - Hello World</TamaguiText>
        <TamaguiText fontWeight="6" fontSize="$md">Weight 6 (ExtraBold) - Hello World</TamaguiText>
        <TamaguiText fontWeight="7" fontSize="$md">Weight 7 (Black) - Hello World</TamaguiText>
      </YStack>

      {/* Test default Tamagui typography */}
      <YStack space="$sm" marginTop="$lg">
        <TamaguiText fontSize="$lg" fontWeight="bold">Default Tamagui Typography:</TamaguiText>

        <TamaguiText fontSize={1}>Font Size 1 (12px)</TamaguiText>
        <TamaguiText fontSize={2}>Font Size 2 (14px)</TamaguiText>
        <TamaguiText fontSize={3}>Font Size 3 (15px)</TamaguiText>
        <TamaguiText fontSize={4}>Font Size 4 (16px)</TamaguiText>
        <TamaguiText fontSize={5}>Font Size 5 (18px)</TamaguiText>
        <TamaguiText fontSize={6}>Font Size 6 (20px)</TamaguiText>
        <TamaguiText fontSize={7}>Font Size 7 (24px)</TamaguiText>
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
