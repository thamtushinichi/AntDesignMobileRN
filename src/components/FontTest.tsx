// src/components/FontTest.tsx
import React from 'react';
import { YStack, XStack, Text, H1, H2, H3, H4, Paragraph, Separator, styled } from 'tamagui';
import { fontFamily, typographyPresets, getTypographyPreset } from '../config/fonts';

// Create a styled text component for testing different weights
const TestText = styled(Text, {
  variants: {
    weight: {
      100: { fontFamily: fontFamily.inter.thin },
      200: { fontFamily: fontFamily.inter.extraLight },
      300: { fontFamily: fontFamily.inter.light },
      400: { fontFamily: fontFamily.inter.regular },
      500: { fontFamily: fontFamily.inter.medium },
      600: { fontFamily: fontFamily.inter.semiBold },
      700: { fontFamily: fontFamily.inter.bold },
      800: { fontFamily: fontFamily.inter.extraBold },
      900: { fontFamily: fontFamily.inter.black },
    },
    size: {
      sm: { fontSize: '$sm' },
      md: { fontSize: '$md' },
      lg: { fontSize: '$lg' },
      xl: { fontSize: '$xl' },
    }
  },
  defaultVariants: {
    weight: 400,
    size: 'md'
  }
});

const FontTest = () => {
  return (
    <YStack padding="$lg" space="$lg">
      <YStack space="$md">
        <H1 textAlign="center" color="$primary">Font Integration Test</H1>
        <Text textAlign="center" color="$textMuted" fontSize="$md">
          Testing Inter font family integration with Tamagui
        </Text>
      </YStack>

      <Separator />

      {/* Typography Presets Test */}
      <YStack space="$md">
        <H2 color="$color">Typography Presets</H2>

        <YStack space="$sm">
          <Text {...getTypographyPreset('display')}>
            Display Text - Large Headers
          </Text>
          <Text {...getTypographyPreset('title')}>
            Title Text - Page Titles
          </Text>
          <Text {...getTypographyPreset('heading')}>
            Heading Text - Section Headers
          </Text>
          <Text {...getTypographyPreset('subheading')}>
            Subheading Text - Subsections
          </Text>
          <Text {...getTypographyPreset('body')}>
            Body Text - Regular content text that flows naturally
          </Text>
          <Text {...getTypographyPreset('bodySmall')}>
            Small Body Text - Secondary information
          </Text>
          <Text {...getTypographyPreset('caption')}>
            Caption Text - Image captions and fine print
          </Text>
          <Text {...getTypographyPreset('button')}>
            Button Text - ACTION BUTTONS
          </Text>
          <Text {...getTypographyPreset('label')}>
            Label Text - Form Labels
          </Text>
        </YStack>
      </YStack>

      <Separator />

      {/* Font Weight Tests */}
      <YStack space="$md">
        <H2 color="$color">Font Weight Tests</H2>

        <YStack space="$sm">
          <TestText weight={100} size="md">
            Inter Thin (100) - The quick brown fox jumps
          </TestText>
          <TestText weight={200} size="md">
            Inter ExtraLight (200) - The quick brown fox jumps
          </TestText>
          <TestText weight={300} size="md">
            Inter Light (300) - The quick brown fox jumps
          </TestText>
          <TestText weight={400} size="md">
            Inter Regular (400) - The quick brown fox jumps
          </TestText>
          <TestText weight={500} size="md">
            Inter Medium (500) - The quick brown fox jumps
          </TestText>
          <TestText weight={600} size="md">
            Inter SemiBold (600) - The quick brown fox jumps
          </TestText>
          <TestText weight={700} size="md">
            Inter Bold (700) - The quick brown fox jumps
          </TestText>
          <TestText weight={800} size="md">
            Inter ExtraBold (800) - The quick brown fox jumps
          </TestText>
          <TestText weight={900} size="md">
            Inter Black (900) - The quick brown fox jumps
          </TestText>
        </YStack>
      </YStack>

      <Separator />

      {/* Tamagui Typography System */}
      <YStack space="$md">
        <H2 color="$color">Tamagui Typography System</H2>

        <YStack space="$sm">
          <H1>H1 - Main Heading</H1>
          <H2>H2 - Section Heading</H2>
          <H3>H3 - Subsection Heading</H3>
          <H4>H4 - Minor Heading</H4>
          <Paragraph>
            Paragraph - This is regular paragraph text that demonstrates
            the default body text styling in Tamagui. It should use the
            Inter Regular font and have proper line height and spacing.
          </Paragraph>
        </YStack>
      </YStack>

      <Separator />

      {/* Font Size Scale */}
      <YStack space="$md">
        <H2 color="$color">Font Size Scale</H2>

        <YStack space="$sm">
          <Text fontSize={1} fontFamily={fontFamily.inter.regular}>
            Size 1 (11px) - Extra small text
          </Text>
          <Text fontSize={2} fontFamily={fontFamily.inter.regular}>
            Size 2 (12px) - Small text
          </Text>
          <Text fontSize={3} fontFamily={fontFamily.inter.regular}>
            Size 3 (13px) - Small medium text
          </Text>
          <Text fontSize={4} fontFamily={fontFamily.inter.regular}>
            Size 4 (14px) - Base text size
          </Text>
          <Text fontSize={5} fontFamily={fontFamily.inter.regular}>
            Size 5 (16px) - Large text
          </Text>
          <Text fontSize={6} fontFamily={fontFamily.inter.regular}>
            Size 6 (18px) - Extra large text
          </Text>
          <Text fontSize={7} fontFamily={fontFamily.inter.regular}>
            Size 7 (20px) - XX large text
          </Text>
          <Text fontSize={8} fontFamily={fontFamily.inter.regular}>
            Size 8 (24px) - XXX large text
          </Text>
        </YStack>
      </YStack>

      <Separator />

      {/* Token-based Sizes */}
      <YStack space="$md">
        <H2 color="$color">Token-based Font Sizes</H2>

        <YStack space="$sm">
          <Text fontSize="$xs" fontFamily={fontFamily.inter.regular}>
            $xs - Extra Small (11px)
          </Text>
          <Text fontSize="$sm" fontFamily={fontFamily.inter.regular}>
            $sm - Small (12px)
          </Text>
          <Text fontSize="$md" fontFamily={fontFamily.inter.regular}>
            $md - Medium (14px)
          </Text>
          <Text fontSize="$lg" fontFamily={fontFamily.inter.regular}>
            $lg - Large (16px)
          </Text>
          <Text fontSize="$xl" fontFamily={fontFamily.inter.regular}>
            $xl - Extra Large (18px)
          </Text>
          <Text fontSize="$2xl" fontFamily={fontFamily.inter.regular}>
            $2xl - 2X Large (20px)
          </Text>
          <Text fontSize="$3xl" fontFamily={fontFamily.inter.regular}>
            $3xl - 3X Large (24px)
          </Text>
        </YStack>
      </YStack>

      <Separator />

      {/* Mixed Styling Tests */}
      <YStack space="$md">
        <H2 color="$color">Mixed Styling Tests</H2>

        <YStack space="$sm">
          <XStack space="$md" alignItems="center">
            <Text
              fontFamily={fontFamily.inter.bold}
              fontSize="$lg"
              color="$primary"
            >
              Bold Primary
            </Text>
            <Text
              fontFamily={fontFamily.inter.medium}
              fontSize="$md"
              color="$success"
            >
              Medium Success
            </Text>
            <Text
              fontFamily={fontFamily.inter.light}
              fontSize="$sm"
              color="$warning"
            >
              Light Warning
            </Text>
          </XStack>

          <Text
            fontFamily={fontFamily.inter.semiBold}
            fontSize="$lg"
            color="$error"
            textAlign="center"
          >
            SemiBold Error Center Aligned
          </Text>

          <Text
            fontFamily={fontFamily.inter.thin}
            fontSize="$xl"
            color="$textMuted"
            textAlign="right"
          >
            Thin Muted Right Aligned
          </Text>
        </YStack>
      </YStack>

      <Separator />

      {/* Font Loading Status */}
      <YStack space="$md">
        <H2 color="$color">Font Loading Status</H2>

        <YStack space="$sm" padding="$md" backgroundColor="$secondary" borderRadius="$md">
          <Text fontWeight="bold" color="$color">
            Expected Font Files:
          </Text>

          {Object.entries(fontFamily.inter).map(([weight, fontName]) => (
            <XStack key={weight} justifyContent="space-between" alignItems="center">
              <Text fontSize="$sm" color="$textMuted">
                {weight}:
              </Text>
              <Text fontSize="$sm" fontFamily={fontName} color="$color">
                {fontName}
              </Text>
            </XStack>
          ))}
        </YStack>

        <YStack padding="$md" backgroundColor="$card" borderRadius="$md" borderWidth={1} borderColor="$borderColor">
          <Text fontSize="$sm" color="$info" textAlign="center">
            ℹ️ If fonts appear as system default, check font linking in iOS/Android
          </Text>
        </YStack>
      </YStack>
    </YStack>
  );
};

export default FontTest;
