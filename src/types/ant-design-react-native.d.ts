// src/types/ant-design-react-native.d.ts
declare module '@ant-design/react-native/lib/style' {
  export interface Theme {
    // Brand colors
    brand_primary: string;
    brand_primary_tap: string;

    // Text colors
    color_text_base: string;
    color_text_base_inverse: string;
    color_text_secondary: string;
    color_text_placeholder: string;
    color_text_disabled: string;
    color_text_caption: string;
    color_link: string;
    color_link_tap: string;

    // Background colors
    fill_base: string;
    fill_body: string;
    fill_tap: string;
    fill_disabled: string;
    fill_mask: string;
    fill_toast: string;
    fill_toast_inverse: string;
    fill_notification: string;

    // Border colors
    border_color_base: string;
    border_color_component: string;

    // Status colors
    success_color: string;
    warning_color: string;
    error_color: string;
    info_color: string;
    wait_color: string;

    // Border radius
    radius_xs: number;
    radius_sm: number;
    radius_md: number;
    radius_lg: number;

    // Button styles
    button_height: number;
    button_font_size: number;
    button_height_sm: number;
    button_font_size_sm: number;
    primary_button_fill: string;
    primary_button_fill_tap: string;
    ghost_button_color: string;
    ghost_button_fill_tap: string;
    warning_button_fill: string;
    warning_button_fill_tap: string;
    link_button_fill_tap: string;
    link_button_font_size: number;

    // Input styles
    input_color_icon: string;
    input_color_icon_tap: string;
    input_color_icon_disabled: string;
    input_font_size: number;
    input_color_text: string;
    input_placeholder_color: string;
    input_error_color: string;
    input_label_color: string;

    // List styles
    list_item_height: number;
    list_title_height: number;
    list_title_font_size: number;
    list_item_active_color: string;
    list_item_hover_bg: string;
    list_item_extra_font_size: number;
    list_item_subtitle_color: string;

    // Card styles
    card_background: string;
    card_border_radius: number;
    card_border_color: string;
    card_head_color: string;
    card_head_font_size: number;
    card_body_color: string;

    // Shadow and elevation
    shadow_color: string;
    shadow_color_1: string;
    shadow_color_2: string;
    elevation_0: number;
    elevation_1: number;
    elevation_2: number;
    elevation_3: number;
    elevation_4: number;
    elevation_5: number;

    // Tab bar
    tabs_color: string;
    tabs_height: number;
    tabs_font_size: number;
    tabs_active_color: string;
    tabs_disabled_color: string;
    tabs_ink_bar_color: string;
    tabs_bar_background_color: string;

    // Segmented control
    segmented_control_color: string;
    segmented_control_height: number;
    segmented_control_fill_tap: string;
    segmented_control_font_size: number;

    // Badge
    badge_color: string;
    badge_font_size: number;
    badge_dot_size: number;
    badge_text_color: string;

    // Menu & Dropdown
    menu_item_color: string;
    menu_item_selected_bg: string;
    menu_item_height: number;
    dropdown_bg: string;
    dropdown_font_size: number;
    dropdown_border_radius: number;

    // Header and Footer
    navbar_color: string;
    navbar_fill: string;
    navbar_height: number;
    navbar_font_size: number;
    navbar_icon_size: number;
    tabbar_fill: string;
    tabbar_height: number;
    tabbar_font_size: number;
    tabbar_active_color: string;
    tabbar_inactive_color: string;

    // Table
    table_header_bg: string;
    table_row_hover_bg: string;
    table_border_color: string;
    table_font_size: number;
    table_row_height: number;

    // Notification and Toast
    notification_color: string;
    notification_bg: string;
    notification_font_size: number;
    toast_fill: string;
    toast_text_color: string;
    toast_font_size: number;

    // Switch
    switch_fill: string;
    switch_unchecked_color: string;
    switch_height: number;

    // Checkbox and Radio
    checkbox_color: string;
    checkbox_border_color: string;
    checkbox_size: number;
    radio_color: string;
    radio_border_color: string;
    radio_size: number;

    // Modal
    modal_font_size_heading: number;
    modal_bg: string;
    modal_close_color: string;
    modal_border_radius: number;

    // Slider
    slider_track_color: string;
    slider_track_active_color: string;
    slider_handle_color: string;
    slider_handle_size: number;

    // Stepper
    stepper_fill: string;
    stepper_height: number;
    stepper_font_color: string;
    stepper_button_color: string;
    stepper_disable_color: string;

    // Spacing
    h_spacing_sm: number;
    h_spacing_md: number;
    h_spacing_lg: number;
    v_spacing_xs: number;
    v_spacing_sm: number;
    v_spacing_md: number;
    v_spacing_lg: number;
    v_spacing_xl: number;

    // Animation
    ease_in_out: string;
    ease_out: string;
    ease_in: string;
    animation_duration_base: number;
    animation_duration_fast: number;
    animation_duration_slow: number;

    // Additional properties may be added as needed
    [key: string]: any;
  }
}
