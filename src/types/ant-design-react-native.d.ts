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

    // Background colors
    fill_base: string;
    fill_body: string;
    fill_tap: string;
    fill_disabled: string;
    fill_mask: string;

    // Border colors
    border_color_base: string;
    border_color_component: string;

    // Status colors
    success_color: string;
    warning_color: string;
    error_color: string;

    // Border radius
    radius_sm: number;
    radius_md: number;
    radius_lg: number;

    // Button styles
    button_height: number;
    button_font_size: number;
    primary_button_fill: string;
    primary_button_fill_tap: string;

    // Input styles
    input_color_icon: string;
    input_color_icon_tap: string;
    input_color_icon_disabled: string;
    input_font_size: number;
    input_color_text: string;
    input_placeholder_color: string;

    // List styles
    list_item_height: number;
    list_title_height: number;
    list_title_font_size: number;

    // Card styles
    card_background: string;
    card_border_radius: number;
    card_border_color: string;

    // Additional properties may be added as needed
    [key: string]: any;
  }
}
