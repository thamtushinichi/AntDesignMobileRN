// src/hooks/useKeyboard.ts
import { useState, useEffect } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

interface KeyboardState {
  keyboardVisible: boolean;
  keyboardHeight: number;
}

export const useKeyboard = () => {
  const [keyboardState, setKeyboardState] = useState<KeyboardState>({
    keyboardVisible: false,
    keyboardHeight: 0,
  });

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event: KeyboardEvent) => {
        setKeyboardState({
          keyboardVisible: true,
          keyboardHeight: event.endCoordinates.height,
        });
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardState({
          keyboardVisible: false,
          keyboardHeight: 0,
        });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return keyboardState;
};
