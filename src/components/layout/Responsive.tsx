// src/components/layout/Responsive.tsx
import React, { ReactNode } from 'react';
import { useWindowDimensions } from 'react-native';
import { YStack, XStack, Stack, getTokens } from 'tamagui';

// Define breakpoints to match Tamagui's media queries
const breakpoints = {
  xs: 0,
  sm: 660,
  md: 800,
  lg: 1020,
  xl: 1280,
  xxl: 1600,
};

type BreakpointKey = keyof typeof breakpoints;

interface ResponsiveProps {
  children: ReactNode;
  direction?: {
    xs?: 'row' | 'column';
    sm?: 'row' | 'column';
    md?: 'row' | 'column';
    lg?: 'row' | 'column';
    xl?: 'row' | 'column';
    xxl?: 'row' | 'column';
  };
  spacing?: {
    xs?: keyof typeof getTokens().space;
    sm?: keyof typeof getTokens().space;
    md?: keyof typeof getTokens().space;
    lg?: keyof typeof getTokens().space;
    xl?: keyof typeof getTokens().space;
    xxl?: keyof typeof getTokens().space;
  };
  hide?: BreakpointKey[];
  show?: BreakpointKey[];
  debug?: boolean;
  [key: string]: any;
}

/**
 * Responsive layout component that adapts to screen size
 * @param children Children to render
 * @param direction Direction object with breakpoint keys
 * @param spacing Spacing object with breakpoint keys
 * @param hide Array of breakpoints to hide at
 * @param show Array of breakpoints to show at
 * @param debug Whether to show debug outlines
 * @param props Any other props to pass to the container
 * @returns Responsive container
 */
const Responsive: React.FC<ResponsiveProps> = ({
                                                 children,
                                                 direction = { xs: 'column', md: 'row' },
                                                 spacing = { xs: 'md' },
                                                 hide,
                                                 show,
                                                 debug = false,
                                                 ...props
                                               }) => {
  const { width } = useWindowDimensions();

  // Determine current breakpoint
  const currentBreakpoint = Object.entries(breakpoints)
    .reverse()
    .find(([_, minWidth]) => width >= minWidth)?.[0] as BreakpointKey || 'xs';

  // Check if should be hidden based on current breakpoint
  if (hide && hide.includes(currentBreakpoint)) {
    return null;
  }

  // Check if should be shown based on current breakpoint
  if (show && !show.includes(currentBreakpoint)) {
    return null;
  }

  // Determine current direction
  const getCurrentValue = <T,>(values: Record<string, T> | undefined, defaultValue: T): T => {
    if (!values) return defaultValue;

    const breakpointKeys = Object.keys(breakpoints) as BreakpointKey[];
    const currentIndex = breakpointKeys.indexOf(currentBreakpoint);

    // Find the closest smaller or equal breakpoint that has a value
    for (let i = currentIndex; i >= 0; i--) {
      const bp = breakpointKeys[i];
      if (values[bp] !== undefined) {
        return values[bp] as T;
      }
    }

    return defaultValue;
  };

  const currentDirection = getCurrentValue(direction, 'column' as const);
  const currentSpacing = getCurrentValue(spacing, '$md');

  // Determine which Stack component to use
  const StackComponent = currentDirection === 'row' ? XStack : YStack;

  return (
    <StackComponent
      space={currentSpacing}
      borderWidth={debug ? 1 : 0}
      borderColor={debug ? '$primary' : undefined}
      {...props}
    >
      {children}
    </StackComponent>
  );
};

/**
 * Show content only at specific breakpoints
 */
interface ShowAtProps {
  children: ReactNode;
  breakpoint: BreakpointKey | BreakpointKey[];
  [key: string]: any;
}

export const ShowAt: React.FC<ShowAtProps> = ({
                                                children,
                                                breakpoint,
                                                ...props
                                              }) => {
  const breakpoints = Array.isArray(breakpoint) ? breakpoint : [breakpoint];

  return (
    <Responsive show={breakpoints} {...props}>
      {children}
    </Responsive>
  );
};

/**
 * Hide content at specific breakpoints
 */
interface HideAtProps {
  children: ReactNode;
  breakpoint: BreakpointKey | BreakpointKey[];
  [key: string]: any;
}

export const HideAt: React.FC<HideAtProps> = ({
                                                children,
                                                breakpoint,
                                                ...props
                                              }) => {
  const breakpoints = Array.isArray(breakpoint) ? breakpoint : [breakpoint];

  return (
    <Responsive hide={breakpoints} {...props}>
      {children}
    </Responsive>
  );
};

export default Responsive;
