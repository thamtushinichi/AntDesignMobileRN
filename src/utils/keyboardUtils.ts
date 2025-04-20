import { Keyboard, Platform, KeyboardEvent } from 'react-native';

/**
 * Utility functions for keyboard interactions
 */
const keyboardUtils = {
  /**
   * Dismiss the keyboard
   */
  dismiss: () => {
    Keyboard.dismiss();
  },

  /**
   * Add a listener for when the keyboard shows
   * @param callback Callback function with keyboard event
   * @returns Subscription to remove the listener
   */
  addShowListener: (callback: (event: KeyboardEvent) => void) => {
    const eventName = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    return Keyboard.addListener(eventName, callback);
  },

  /**
   * Add a listener for when the keyboard hides
   * @param callback Callback function with keyboard event
   * @returns Subscription to remove the listener
   */
  addHideListener: (callback: (event: KeyboardEvent) => void) => {
    const eventName = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    return Keyboard.addListener(eventName, callback);
  },

  /**
   * Calculate the keyboard height based on the event
   * @param event Keyboard event
   * @returns Keyboard height in pixels
   */
  getKeyboardHeight: (event: KeyboardEvent): number => {
    return event.endCoordinates.height;
  },

  /**
   * Calculate extra spacing needed for inputs above the keyboard
   * This can be used to add additional padding to ensure inputs are visible
   * @param event Keyboard event
   * @param extraPadding Additional padding to add (default: 10)
   * @returns Total extra spacing needed
   */
  getExtraSpacing: (event: KeyboardEvent, extraPadding: number = 10): number => {
    return keyboardUtils.getKeyboardHeight(event) + extraPadding;
  },
};

export default keyboardUtils;
