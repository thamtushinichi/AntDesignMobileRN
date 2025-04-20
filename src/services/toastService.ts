import { Toast } from '@ant-design/react-native';

type ToastType = 'info' | 'success' | 'warning' | 'error';
type ToastDuration = 'short' | 'long';

interface ToastOptions {
  type?: ToastType;
  duration?: ToastDuration | number;
  mask?: boolean;
  onClose?: () => void;
}

/**
 * Toast notification service
 * Wrapper around Ant Design Mobile Toast with additional functionality
 */
const toastService = {
  /**
   * Show a toast message
   * @param message Message to display
   * @param options Toast options
   */
  show: (message: string, options: ToastOptions = {}) => {
    const { type = 'info', duration = 'short', mask = false, onClose } = options;

    // Convert duration to a number in seconds
    let durationMs: number;
    if (duration === 'short') {
      durationMs = 2;
    } else if (duration === 'long') {
      durationMs = 3.5;
    } else {
      durationMs = duration;
    }

    switch (type) {
      case 'success':
        Toast.success(message, durationMs, onClose, mask);
        break;
      case 'warning':
        // Ant design doesn't have a warning toast, so we use the info toast with custom content
        Toast.info(`⚠️ ${message}`, durationMs, onClose, mask);
        break;
      case 'error':
        Toast.fail(message, durationMs, onClose, mask);
        break;
      case 'info':
      default:
        Toast.info(message, durationMs, onClose, mask);
        break;
    }
  },

  /**
   * Show an info toast
   * @param message Message to display
   * @param duration Duration in seconds or 'short'/'long'
   * @param onClose Callback when toast is closed
   * @param mask Whether to show a transparent mask
   */
  info: (message: string, duration?: ToastDuration | number, onClose?: () => void, mask?: boolean) => {
    toastService.show(message, { type: 'info', duration, onClose, mask });
  },

  /**
   * Show a success toast
   * @param message Message to display
   * @param duration Duration in seconds or 'short'/'long'
   * @param onClose Callback when toast is closed
   * @param mask Whether to show a transparent mask
   */
  success: (message: string, duration?: ToastDuration | number, onClose?: () => void, mask?: boolean) => {
    toastService.show(message, { type: 'success', duration, onClose, mask });
  },

  /**
   * Show a warning toast
   * @param message Message to display
   * @param duration Duration in seconds or 'short'/'long'
   * @param onClose Callback when toast is closed
   * @param mask Whether to show a transparent mask
   */
  warning: (message: string, duration?: ToastDuration | number, onClose?: () => void, mask?: boolean) => {
    toastService.show(message, { type: 'warning', duration, onClose, mask });
  },

  /**
   * Show an error toast
   * @param message Message to display
   * @param duration Duration in seconds or 'short'/'long'
   * @param onClose Callback when toast is closed
   * @param mask Whether to show a transparent mask
   */
  error: (message: string, duration?: ToastDuration | number, onClose?: () => void, mask?: boolean) => {
    toastService.show(message, { type: 'error', duration, onClose, mask });
  },

  /**
   * Show a loading toast
   * @param message Message to display
   * @param duration Duration in seconds (if not provided, toast will remain until hide() is called)
   * @param onClose Callback when toast is closed
   * @param mask Whether to show a transparent mask
   */
  loading: (message: string, duration?: number, onClose?: () => void, mask: boolean = true) => {
    Toast.loading(message, duration, onClose, mask);
  },

  /**
   * Hide the current toast
   */
  hide: () => {
    // Use type assertion with unknown as intermediate step
    // This is a workaround since the Toast type doesn't include hide() but the actual object does
    (Toast as unknown as { hide: () => void }).hide();
  },
};

export default toastService;
