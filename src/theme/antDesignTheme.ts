// src/theme/antDesignTheme.ts
import {Theme} from '@ant-design/react-native/lib/style';

/**
 * Creates a theme for Ant Design Mobile RN based on the blue gradient colors
 */
const createAntDesignTheme = (isDarkMode: boolean): Partial<Theme> => {
  // Primary colors from the gradient
  const colorPrimary = '#0CB5EB';      // Bright blue from the middle of gradient
  const colorInfo = '#0174A3';         // Darker blue from the start of gradient
  const colorTextBase = '#001566';     // Very dark blue from the end of gradient

  // Supporting colors
  const colorSuccess = '#23A845';      // Green
  const colorWarning = '#ED9107';      // Orange/amber
  const colorError = '#E52968';        // Pink/red

  // Background colors
  const colorBgBase = '#FFFFFF';
  const colorBgContainer = '#F9FBFF';  // Very light blue tint for containers
  const colorBgElevated = '#FFFFFF';
  const colorBgLayout = '#F2F5FF';     // Light blue background for layouts

  // Border colors
  const colorBorder = '#E1E5F2';       // Light blue-gray border
  const colorBorderSecondary = '#EBF0FA'; // Lighter border

  // Text colors
  const colorTextSecondary = '#4A5889'; // Medium blue for secondary text
  const colorTextTertiary = '#8D96B9';  // Light blue-gray for tertiary text
  const colorTextDisabled = '#B0B7D3';  // Disabled text

  // Light mode theme
  const lightTheme: Partial<Theme> = {
    // Primary colors
    brand_primary: colorPrimary,
    brand_primary_tap: colorInfo,

    // Text colors
    color_text_base: colorTextBase,
    color_text_base_inverse: '#FFFFFF',
    color_text_secondary: colorTextSecondary,
    color_text_placeholder: colorTextTertiary,
    color_text_disabled: colorTextDisabled,
    color_text_caption: colorTextSecondary,

    // Background colors
    fill_base: colorBgBase,
    fill_body: colorBgLayout,
    fill_tap: '#ECF6FB',
    fill_disabled: colorBorderSecondary,
    fill_mask: 'rgba(0, 21, 102, 0.45)',

    // Border colors
    border_color_base: colorBorder,
    border_color_component: colorBorder,

    // Status colors
    success_color: colorSuccess,
    warning_color: colorWarning,
    error_color: colorError,

    // Border radius
    radius_sm: 2,
    radius_md: 4,
    radius_lg: 6,

    // Button styles
    button_height: 44,
    button_font_size: 16,
    button_height_sm: 30,
    button_font_size_sm: 13,
    primary_button_fill: colorPrimary,
    primary_button_fill_tap: colorInfo,
    ghost_button_color: colorPrimary,
    ghost_button_fill_tap: `${colorPrimary}16`,
    warning_button_fill: colorWarning,
    warning_button_fill_tap: '#D68100',

    // Input styles
    input_color_icon: colorTextTertiary,
    input_color_icon_tap: colorPrimary,
    input_color_icon_disabled: colorTextDisabled,
    input_font_size: 16,
    input_color_text: colorTextBase,
    input_placeholder_color: colorTextTertiary,

    // List styles
    list_item_height: 50,
    list_title_height: 30,
    list_title_font_size: 14,

    // Card styles
    card_background: colorBgBase,
    card_border_radius: 6,
    card_border_color: colorBorder,

    // Added colors for more components
    tabs_color: colorPrimary,
    segmented_control_color: colorPrimary,
    badge_color: colorError,

    // Menu & Dropdown
    menu_item_color: colorTextBase,
    menu_item_selected_bg: '#ECF6FB',

    // Header and Footer styles
    navbar_color: colorTextBase,
    navbar_fill: colorBgBase,

    // Table styles
    table_header_bg: colorBgLayout,
    table_row_hover_bg: '#ECF6FB',
    table_border_color: colorBorder,

    // Notification
    notification_color: colorTextBase,
    notification_bg: colorBgBase,

    // Shadow
    shadow_color: 'rgba(0, 0, 0, 0.1)',
    shadow_color_1: 'rgba(0, 0, 0, 0.05)',
    shadow_color_2: 'rgba(0, 0, 0, 0.15)',
  };

  // Dark mode theme
  const darkTheme: Partial<Theme> = {
    // Primary colors - adjusted for dark mode
    brand_primary: '#3BC4F3',          // Brighter blue for dark mode
    brand_primary_tap: '#50D0FF',      // Even brighter when tapped

    // Text colors
    color_text_base: '#F9FBFF',        // Near white with slight blue tint
    color_text_base_inverse: '#001566', // Dark blue for inverted text
    color_text_secondary: '#A0ACDA',   // Light blue for secondary text
    color_text_placeholder: '#6A7096', // Muted blue for placeholder
    color_text_disabled: '#4A5274',    // Dark muted blue for disabled
    color_text_caption: '#A0ACDA',     // Caption text

    // Background colors
    fill_base: '#121638',              // Dark blue background
    fill_body: '#0A0D24',              // Darker blue for layout
    fill_tap: '#202952',               // Slightly lighter when tapped
    fill_disabled: '#262D52',          // Disabled state
    fill_mask: 'rgba(0, 0, 0, 0.75)',  // Darker mask for modals

    // Border colors
    border_color_base: '#323865',      // Dark blue border
    border_color_component: '#323865',

    // Status colors - adjusted for dark mode
    success_color: '#30C456',          // Brighter green for dark mode
    warning_color: '#FFA726',          // Brighter orange for dark mode
    error_color: '#FF4081',            // Brighter pink/red for dark mode

    // Same border radius
    radius_sm: 2,
    radius_md: 4,
    radius_lg: 6,

    // Button styles
    button_height: 44,
    button_font_size: 16,
    button_height_sm: 30,
    button_font_size_sm: 13,
    primary_button_fill: '#3BC4F3',
    primary_button_fill_tap: '#50D0FF',
    ghost_button_color: '#3BC4F3',
    ghost_button_fill_tap: '#3BC4F333',
    warning_button_fill: '#FFA726',
    warning_button_fill_tap: '#E08600',

    // Input styles
    input_color_icon: '#6A7096',
    input_color_icon_tap: '#3BC4F3',
    input_color_icon_disabled: '#4A5274',
    input_font_size: 16,
    input_color_text: '#F9FBFF',
    input_placeholder_color: '#6A7096',

    // List styles
    list_item_height: 50,
    list_title_height: 30,
    list_title_font_size: 14,

    // Card styles
    card_background: '#182046',
    card_border_radius: 6,
    card_border_color: '#323865',

    // Added colors for more components
    tabs_color: '#3BC4F3',
    segmented_control_color: '#3BC4F3',
    badge_color: '#FF4081',

    // Menu & Dropdown
    menu_item_color: '#F9FBFF',
    menu_item_selected_bg: '#202952',

    // Header and Footer styles
    navbar_color: '#F9FBFF',
    navbar_fill: '#121638',

    // Table styles
    table_header_bg: '#0A0D24',
    table_row_hover_bg: '#202952',
    table_border_color: '#323865',

    // Notification
    notification_color: '#F9FBFF',
    notification_bg: '#182046',

    // Shadow
    shadow_color: 'rgba(0, 0, 0, 0.3)',
    shadow_color_1: 'rgba(0, 0, 0, 0.2)',
    shadow_color_2: 'rgba(0, 0, 0, 0.4)',
  };

  return isDarkMode ? darkTheme : lightTheme;
};

export default createAntDesignTheme;
