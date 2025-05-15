// src/components/ui/Modal.tsx
import React, { ReactNode } from 'react';
import { Sheet, YStack, XStack, Button, Text, H4, styled } from 'tamagui';
import { X } from '@tamagui/lucide-icons';

// Create a styled container for the modal content
const ModalContainer = styled(YStack, {
  borderTopLeftRadius: '$lg',
  borderTopRightRadius: '$lg',
  backgroundColor: '$card',
  padding: '$lg',
  maxWidth: 500,
  width: '100%',
  variants: {
    size: {
      small: {
        maxHeight: '30%',
      },
      medium: {
        maxHeight: '50%',
      },
      large: {
        maxHeight: '80%',
      },
      full: {
        maxHeight: '100%',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

// Modal props
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'small' | 'medium' | 'large' | 'full';
  showCloseButton?: boolean;
  footer?: ReactNode;
  closeOnBackdropPress?: boolean;
}

const Modal: React.FC<ModalProps> = ({
                                       open,
                                       onClose,
                                       title,
                                       children,
                                       size = 'medium',
                                       showCloseButton = true,
                                       footer,
                                       closeOnBackdropPress = true,
                                     }) => {
  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      onClose();
    }
  };

  return (
    <Sheet
      modal
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      snapPoints={[size === 'full' ? 95 : size === 'large' ? 80 : size === 'small' ? 30 : 50]}
      dismissOnSnapToBottom
      position={0}
      zIndex={100000}
    >
      <Sheet.Overlay
        animation="quick"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
        backgroundColor="$shadowColor"
        opacity={0.7}
        onPress={handleBackdropPress}
      />

      <Sheet.Frame>
        <ModalContainer size={size}>
          {/* Header */}
          {(title || showCloseButton) && (
            <XStack justifyContent="space-between" alignItems="center" marginBottom="$md">
              {title ? (
                <H4 color="$color">{title}</H4>
              ) : (
                <YStack width={24} />
              )}

              {showCloseButton && (
                <Button
                  size="$sm"
                  circular
                  icon={<X />}
                  variant="ghost"
                  onPress={onClose}
                />
              )}
            </XStack>
          )}

          {/* Content */}
          <YStack flex={1}>{children}</YStack>

          {/* Footer */}
          {footer && (
            <YStack marginTop="$lg">
              {footer}
            </YStack>
          )}
        </ModalContainer>
      </Sheet.Frame>
    </Sheet>
  );
};

export default Modal;
