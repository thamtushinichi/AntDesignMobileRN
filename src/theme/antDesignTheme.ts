// src/theme/antDesignTheme.ts
import {Theme} from '@ant-design/react-native/lib/style';

/**
 * Color palette for both light and dark modes
 * This centralizes all color definitions
 */
export const palette = {
  // Primary blues
  blue: {
    lighter: '#e6f7ff',
    light: '#b5f5ec',
    regular: '#0CB5EB',
    medium: '#0174A3',
    dark: '#001566',
  },
  // Supporting colors
  green: {
    light: '#d9f7be',
    regular: '#23A845',
    dark: '#237804',
  },
  red: {
    light: '#ffccc7',
    regular: '#E52968',
    dark: '#a8071a',
  },
  yellow: {
    light: '#fff1b8',
    regular: '#ED9107',
    dark: '#ad6800',
  },
  cyan: {
    light: '#b5f5ec',
    regular: '#13c2c2',
    dark: '#006d75',
  },
  // Gray scale
  gray: {
    white: '#FFFFFF',
    lightest: '#F9FBFF',
    lighter: '#F2F5FF',
    light: '#E1E5F2',
    medium: '#8D96B9',
    dark: '#4A5889',
    darker: '#121638',
    darkest: '#0A0D24',
    black: '#000000',
  },
};

/**
 * Shadow styles for both light and dark modes
 */
export const shadows = {
  none: {
    shadowColor: palette.gray.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  xs: {
    shadowColor: palette.gray.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  s: {
    shadowColor: palette.gray.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  m: {
    shadowColor: palette.gray.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  l: {
    shadowColor: palette.gray.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  xl: {
    shadowColor: palette.gray.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 12,
  },
};

/**
 * Creates a theme for Ant Design Mobile RN based on the color palette
 */
const createAntDesignTheme = (isDarkMode: boolean): Partial<Theme> => {
  // Light mode theme
  const lightTheme: Partial<Theme> = {
    // Brand colors
    brand_primary: palette.blue.regular,
    brand_primary_tap: palette.blue.medium,

    // Text colors
    color_text_base: palette.blue.dark,
    color_text_base_inverse: palette.gray.white,
    color_text_secondary: palette.gray.dark,
    color_text_placeholder: palette.gray.medium,
    color_text_disabled: palette.gray.light,
    color_text_caption: palette.gray.dark,
    color_link: palette.blue.regular,
    color_link_tap: palette.blue.medium,

    // Background colors
    fill_base: palette.gray.white,
    fill_body: palette.gray.lighter,
    fill_tap: '#ECF6FB',
    fill_disabled: palette.gray.light,
    fill_mask: 'rgba(0, 21, 102, 0.45)',
    fill_toast: 'rgba(0, 0, 0, 0.8)',
    fill_toast_inverse: palette.gray.white,
    fill_notification: palette.gray.white,

    // Border colors
    border_color_base: palette.gray.light,
    border_color_component: palette.gray.light,

    // Status colors
    success_color: palette.green.regular,
    warning_color: palette.yellow.regular,
    error_color: palette.red.regular,
    info_color: palette.cyan.regular,
    wait_color: palette.yellow.light,

    // Border radius
    radius_xs: 2,
    radius_sm: 4,
    radius_md: 6,
    radius_lg: 8,

    // Button styles
    button_height: 44,
    button_font_size: 16,
    button_height_sm: 30,
    button_font_size_sm: 13,
    primary_button_fill: palette.blue.regular,
    primary_button_fill_tap: palette.blue.medium,
    ghost_button_color: palette.blue.regular,
    ghost_button_fill_tap: `${palette.blue.regular}16`,
    warning_button_fill: palette.yellow.regular,
    warning_button_fill_tap: palette.yellow.dark,
    link_button_fill_tap: palette.gray.lighter,
    link_button_font_size: 14,

    // Input styles
    input_color_icon: palette.gray.medium,
    input_color_icon_tap: palette.blue.regular,
    input_color_icon_disabled: palette.gray.light,
    input_font_size: 16,
    input_color_text: palette.blue.dark,
    input_placeholder_color: palette.gray.medium,
    input_error_color: palette.red.regular,
    input_label_color: palette.gray.dark,

    // List styles
    list_item_height: 50,
    list_title_height: 30,
    list_title_font_size: 14,
    list_item_active_color: palette.blue.regular,
    list_item_hover_bg: palette.gray.lighter,
    list_item_extra_font_size: 14,
    list_item_subtitle_color: palette.gray.medium,

    // Card styles
    card_background: palette.gray.white,
    card_border_radius: 6,
    card_border_color: palette.gray.light,
    card_head_color: palette.blue.dark,
    card_head_font_size: 16,
    card_body_color: palette.gray.dark,

    // Shadow and elevation
    shadow_color: 'rgba(0, 0, 0, 0.1)',
    shadow_color_1: 'rgba(0, 0, 0, 0.05)',
    shadow_color_2: 'rgba(0, 0, 0, 0.15)',
    elevation_0: 0,
    elevation_1: 2,
    elevation_2: 4,
    elevation_3: 8,
    elevation_4: 16,
    elevation_5: 24,

    // Tab bar
    tabs_color: palette.blue.regular,
    tabs_height: 42,
    tabs_font_size: 14,
    tabs_active_color: palette.blue.regular,
    tabs_disabled_color: palette.gray.medium,
    tabs_ink_bar_color: palette.blue.regular,
    tabs_bar_background_color: palette.gray.white,

    // Segmented control
    segmented_control_color: palette.blue.regular,
    segmented_control_height: 32,
    segmented_control_fill_tap: palette.blue.lighter,
    segmented_control_font_size: 14,

    // Badge
    badge_color: palette.red.regular,
    badge_font_size: 12,
    badge_dot_size: 8,
    badge_text_color: palette.gray.white,

    // Menu & Dropdown
    menu_item_color: palette.blue.dark,
    menu_item_selected_bg: '#ECF6FB',
    menu_item_height: 40,
    dropdown_bg: palette.gray.white,
    dropdown_font_size: 14,
    dropdown_border_radius: 4,

    // Header and Footer styles
    navbar_color: palette.blue.dark,
    navbar_fill: palette.gray.white,
    navbar_height: 44,
    navbar_font_size: 17,
    navbar_icon_size: 22,
    tabbar_fill: palette.gray.white,
    tabbar_height: 50,
    tabbar_font_size: 10,
    tabbar_active_color: palette.blue.regular,
    tabbar_inactive_color: palette.gray.medium,

    // Table styles
    table_header_bg: palette.gray.lighter,
    table_row_hover_bg: '#ECF6FB',
    table_border_color: palette.gray.light,
    table_font_size: 14,
    table_row_height: 48,

    // Notification and Toast
    notification_color: palette.blue.dark,
    notification_bg: palette.gray.white,
    notification_font_size: 14,
    toast_fill: 'rgba(0, 0, 0, 0.8)',
    toast_text_color: palette.gray.white,
    toast_font_size: 14,

    // Switch
    switch_fill: palette.blue.regular,
    switch_unchecked_color: '#ccc',
    switch_height: 28,

    // Checkbox and Radio
    checkbox_color: palette.blue.regular,
    checkbox_border_color: palette.gray.medium,
    checkbox_size: 20,
    radio_color: palette.blue.regular,
    radio_border_color: palette.gray.medium,
    radio_size: 20,

    // Modal
    modal_font_size_heading: 18,
    modal_bg: palette.gray.white,
    modal_close_color: palette.gray.dark,
    modal_border_radius: 6,

    // Slider
    slider_track_color: palette.gray.light,
    slider_track_active_color: palette.blue.regular,
    slider_handle_color: palette.gray.white,
    slider_handle_size: 24,

    // Stepper
    stepper_fill: palette.gray.white,
    stepper_height: 28,
    stepper_font_color: palette.blue.dark,
    stepper_button_color: palette.blue.regular,
    stepper_disable_color: palette.gray.light,

    // Spacing
    h_spacing_sm: 8,
    h_spacing_md: 16,
    h_spacing_lg: 24,
    v_spacing_xs: 4,
    v_spacing_sm: 8,
    v_spacing_md: 16,
    v_spacing_lg: 24,
    v_spacing_xl: 32,

    // Animation
    ease_in_out: 'cubic-bezier(0.4, 0, 0.2, 1)',
    ease_out: 'cubic-bezier(0.0, 0, 0.2, 1)',
    ease_in: 'cubic-bezier(0.4, 0, 1, 1)',
    animation_duration_base: 300,
    animation_duration_fast: 150,
    animation_duration_slow: 500,
  };

  // Dark mode theme
  const darkTheme: Partial<Theme> = {
    // Brand colors
    brand_primary: '#3BC4F3',
    brand_primary_tap: '#50D0FF',

    // Text colors
    color_text_base: palette.gray.lightest,
    color_text_base_inverse: palette.blue.dark,
    color_text_secondary: '#A0ACDA',
    color_text_placeholder: '#6A7096',
    color_text_disabled: '#4A5274',
    color_text_caption: '#A0ACDA',
    color_link: '#3BC4F3',
    color_link_tap: '#50D0FF',

    // Background colors
    fill_base: palette.gray.darker,
    fill_body: palette.gray.darkest,
    fill_tap: '#202952',
    fill_disabled: '#262D52',
    fill_mask: 'rgba(0, 0, 0, 0.75)',
    fill_toast: 'rgba(0, 0, 0, 0.8)',
    fill_toast_inverse: palette.gray.darker,
    fill_notification: '#182046',

    // Border colors
    border_color_base: '#323865',
    border_color_component: '#323865',

    // Status colors
    success_color: '#30C456',
    warning_color: '#FFA726',
    error_color: '#FF4081',
    info_color: '#40C4FF',
    wait_color: '#FFE082',

    // Border radius
    radius_xs: 2,
    radius_sm: 4,
    radius_md: 6,
    radius_lg: 8,

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
    link_button_fill_tap: '#202952',
    link_button_font_size: 14,

    // Input styles
    input_color_icon: '#6A7096',
    input_color_icon_tap: '#3BC4F3',
    input_color_icon_disabled: '#4A5274',
    input_font_size: 16,
    input_color_text: palette.gray.lightest,
    input_placeholder_color: '#6A7096',
    input_error_color: '#FF4081',
    input_label_color: '#A0ACDA',

    // List styles
    list_item_height: 50,
    list_title_height: 30,
    list_title_font_size: 14,
    list_item_active_color: '#3BC4F3',
    list_item_hover_bg: '#202952',
    list_item_extra_font_size: 14,
    list_item_subtitle_color: '#6A7096',

    // Card styles
    card_background: '#182046',
    card_border_radius: 6,
    card_border_color: '#323865',
    card_head_color: palette.gray.lightest,
    card_head_font_size: 16,
    card_body_color: '#A0ACDA',

    // Shadow and elevation
    shadow_color: 'rgba(0, 0, 0, 0.3)',
    shadow_color_1: 'rgba(0, 0, 0, 0.2)',
    shadow_color_2: 'rgba(0, 0, 0, 0.4)',
    elevation_0: 0,
    elevation_1: 2,
    elevation_2: 4,
    elevation_3: 8,
    elevation_4: 16,
    elevation_5: 24,

    // Tab bar
    tabs_color: '#3BC4F3',
    tabs_height: 42,
    tabs_font_size: 14,
    tabs_active_color: '#3BC4F3',
    tabs_disabled_color: '#4A5274',
    tabs_ink_bar_color: '#3BC4F3',
    tabs_bar_background_color: palette.gray.darker,

    // Segmented control
    segmented_control_color: '#3BC4F3',
    segmented_control_height: 32,
    segmented_control_fill_tap: '#182046',
    segmented_control_font_size: 14,

    // Badge
    badge_color: '#FF4081',
    badge_font_size: 12,
    badge_dot_size: 8,
    badge_text_color: palette.gray.white,

    // Menu & Dropdown
    menu_item_color: palette.gray.lightest,
    menu_item_selected_bg: '#202952',
    menu_item_height: 40,
    dropdown_bg: '#182046',
    dropdown_font_size: 14,
    dropdown_border_radius: 4,

    // Header and Footer styles
    navbar_color: palette.gray.lightest,
    navbar_fill: palette.gray.darker,
    navbar_height: 44,
    navbar_font_size: 17,
    navbar_icon_size: 22,
    tabbar_fill: palette.gray.darker,
    tabbar_height: 50,
    tabbar_font_size: 10,
    tabbar_active_color: '#3BC4F3',
    tabbar_inactive_color: '#6A7096',

    // Table styles
    table_header_bg: palette.gray.darkest,
    table_row_hover_bg: '#202952',
    table_border_color: '#323865',
    table_font_size: 14,
    table_row_height: 48,

    // Notification and Toast
    notification_color: palette.gray.lightest,
    notification_bg: '#182046',
    notification_font_size: 14,
    toast_fill: 'rgba(255, 255, 255, 0.9)',
    toast_text_color: palette.gray.darkest,
    toast_font_size: 14,

    // Switch
    switch_fill: '#3BC4F3',
    switch_unchecked_color: '#323865',
    switch_height: 28,

    // Checkbox and Radio
    checkbox_color: '#3BC4F3',
    checkbox_border_color: '#6A7096',
    checkbox_size: 20,
    radio_color: '#3BC4F3',
    radio_border_color: '#6A7096',
    radio_size: 20,

    // Modal
    modal_font_size_heading: 18,
    modal_bg: '#182046',
    modal_close_color: '#A0ACDA',
    modal_border_radius: 6,

    // Slider
    slider_track_color: '#323865',
    slider_track_active_color: '#3BC4F3',
    slider_handle_color: palette.gray.lightest,
    slider_handle_size: 24,

    // Stepper
    stepper_fill: '#182046',
    stepper_height: 28,
    stepper_font_color: palette.gray.lightest,
    stepper_button_color: '#3BC4F3',
    stepper_disable_color: '#323865',

    // Spacing
    h_spacing_sm: 8,
    h_spacing_md: 16,
    h_spacing_lg: 24,
    v_spacing_xs: 4,
    v_spacing_sm: 8,
    v_spacing_md: 16,
    v_spacing_lg: 24,
    v_spacing_xl: 32,

    // Animation
    ease_in_out: 'cubic-bezier(0.4, 0, 0.2, 1)',
    ease_out: 'cubic-bezier(0.0, 0, 0.2, 1)',
    ease_in: 'cubic-bezier(0.4, 0, 1, 1)',
    animation_duration_base: 300,
    animation_duration_fast: 150,
    animation_duration_slow: 500,
  };

  return isDarkMode ? darkTheme : lightTheme;
};

export default createAntDesignTheme;
