// src/components/ui/Toast.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, forwardRef, useImperativeHandle } from 'react';
import { AnimatePresence } from 'tamagui';
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from '@tamagui/lucide-icons';
import { styled, YStack, XStack, Text } from 'tamagui';

// Define toast types
type ToastType = 'success' | 'error' | 'info' | 'warning';
type ToastPosition = 'top' | 'bottom';

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastProps[];
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  hideToast: (id: string) => void;
  hideAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Styled toast container
const ToastContainer = styled(YStack, {
  position: 'absolute',
  width: '100%',
  paddingHorizontal: '$md',
  zIndex: 9999,
  pointerEvents: 'box-none',
  variants: {
    position: {
      top: {
        top: '$xl',
      },
      bottom: {
        bottom: '$xl',
      }
    }
  },
  defaultVariants: {
    position: 'top',
  }
});

// Styled toast item
const ToastItem = styled(XStack, {
  backgroundColor: '$card',
  borderRadius: '$md',
  padding: '$md',
  marginBottom: '$sm',
  alignItems: 'center',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
  elevation: 3,
  variants: {
    type: {
      success: {
        borderLeftColor: '$success',
        borderLeftWidth: 4,
      },
      error: {
        borderLeftColor: '$error',
        borderLeftWidth: 4,
      },
      info: {
        borderLeftColor: '$primary',
        borderLeftWidth: 4,
      },
      warning: {
        borderLeftColor: '$warning',
        borderLeftWidth: 4,
      },
    },
  },
  defaultVariants: {
    type: 'info',
  },
});

// Get icon based on toast type
const getToastIcon = (type: ToastType) => {
  switch (type) {
    case 'success':
      return <CheckCircle color="$success" size="$md" />;
    case 'error':
      return <AlertCircle color="$error" size="$md" />;
    case 'warning':
      return <AlertTriangle color="$warning" size="$md" />;
    case 'info':
    default:
      return <Info color="$primary" size="$md" />;
  }
};

interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
}

// Export ToastProviderRef interface
export interface ToastProviderRef {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  hideToast: (id: string) => void;
  hideAll: () => void;
}

// Toast provider component with forwardRef
export const ToastProvider = forwardRef<ToastProviderRef, ToastProviderProps>((
  { children, position = 'top' },
  ref
) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const showToast = (message: string, type: ToastType = 'info', duration = 3000) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  };

  const success = (message: string, duration?: number) => {
    return showToast(message, 'success', duration);
  };

  const error = (message: string, duration?: number) => {
    return showToast(message, 'error', duration);
  };

  const info = (message: string, duration?: number) => {
    return showToast(message, 'info', duration);
  };

  const warning = (message: string, duration?: number) => {
    return showToast(message, 'warning', duration);
  };

  const hideToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const hideAll = () => {
    setToasts([]);
  };

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    showToast,
    success,
    error,
    info,
    warning,
    hideToast,
    hideAll
  }));

  // Export context values
  const contextValue: ToastContextType = {
    toasts,
    showToast,
    success,
    error,
    info,
    warning,
    hideToast,
    hideAll,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer position={position}>
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItemComponent
              key={toast.id}
              toast={toast}
              onHide={hideToast}
            />
          ))}
        </AnimatePresence>
      </ToastContainer>
    </ToastContext.Provider>
  );
});

// Add a display name
ToastProvider.displayName = 'ToastProvider';

// Toast item component with auto-hide functionality
const ToastItemComponent = ({
                              toast,
                              onHide,
                            }: {
  toast: ToastProps;
  onHide: (id: string) => void;
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onHide(toast.id);
    }, toast.duration || 3000);

    return () => clearTimeout(timer);
  }, [toast, onHide]);

  return (
    <ToastItem
      type={toast.type}
      animation="quick"
      enterStyle={{ opacity: 0, scale: 0.9, y: -10 }}
      exitStyle={{ opacity: 0, scale: 0.9, y: -10 }}
    >
      <XStack flex={1} alignItems="center" space="$sm">
        {getToastIcon(toast.type)}
        <Text flex={1} color="$color">{toast.message}</Text>
        <X
          color="$textMuted"
          size="$sm"
          pressable
          onPress={() => onHide(toast.id)}
        />
      </XStack>
    </ToastItem>
  );
};

// Custom hook to use the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Export a standalone toast service for use outside components
export const toastService = {
  toasts: [] as ToastProps[],
  _provider: null as ToastProviderRef | null,

  setProvider(provider: ToastProviderRef | null) {
    this._provider = provider;
  },

  showToast(message: string, type: ToastType = 'info', duration?: number) {
    if (this._provider) {
      return this._provider.showToast(message, type, duration);
    }
    console.warn('Toast provider not initialized');
    return '';
  },

  success(message: string, duration?: number) {
    if (this._provider) {
      return this._provider.success(message, duration);
    }
    console.warn('Toast provider not initialized');
    return '';
  },

  error(message: string, duration?: number) {
    if (this._provider) {
      return this._provider.error(message, duration);
    }
    console.warn('Toast provider not initialized');
    return '';
  },

  info(message: string, duration?: number) {
    if (this._provider) {
      return this._provider.info(message, duration);
    }
    console.warn('Toast provider not initialized');
    return '';
  },

  warning(message: string, duration?: number) {
    if (this._provider) {
      return this._provider.warning(message, duration);
    }
    console.warn('Toast provider not initialized');
    return '';
  },

  hide(id: string) {
    if (this._provider) {
      this._provider.hideToast(id);
    } else {
      console.warn('Toast provider not initialized');
    }
  },

  hideAll() {
    if (this._provider) {
      this._provider.hideAll();
    } else {
      console.warn('Toast provider not initialized');
    }
  }
};
