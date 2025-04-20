// src/hooks/useBackHandler.ts
import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export const useBackHandler = (handleBackPress: () => boolean | null | undefined) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => handleBackPress() || false
    );

    return () => backHandler.remove();
  }, [handleBackPress]);
};
