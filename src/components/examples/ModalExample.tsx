// src/components/examples/ModalExample.tsx
import React, { useState } from 'react';
import { YStack, XStack, Text, Button } from 'tamagui';
import { AlertTriangle } from '@tamagui/lucide-icons';
import { Modal } from '../ui';

const ModalExample: React.FC = () => {
  const [simpleModalOpen, setSimpleModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [fullModalOpen, setFullModalOpen] = useState(false);

  return (
    <YStack space="$lg" padding="$md">
      <Text fontSize="$xl" fontWeight="bold" textAlign="center" marginBottom="$md">
        Modal Examples
      </Text>

      <Button onPress={() => setSimpleModalOpen(true)}>
        Open Simple Modal
      </Button>

      <Button
        variant="outline"
        onPress={() => setConfirmModalOpen(true)}
      >
        Open Confirm Modal
      </Button>

      <Button
        variant="secondary"
        onPress={() => setFullModalOpen(true)}
      >
        Open Full Content Modal
      </Button>

      {/* Simple Modal Example */}
      <Modal
        open={simpleModalOpen}
        onClose={() => setSimpleModalOpen(false)}
        title="Simple Modal"
        size="small"
      >
        <YStack space="$md">
          <Text>
            This is a simple modal with a title and close button.
          </Text>
          <Button onPress={() => setSimpleModalOpen(false)}>
            Close
          </Button>
        </YStack>
      </Modal>

      {/* Confirm Modal Example */}
      <Modal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Confirm Action"
        size="small"
        closeOnBackdropPress={false}
        footer={
          <XStack space="$sm" justifyContent="flex-end">
            <Button
              variant="outline"
              onPress={() => setConfirmModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onPress={() => {
                alert('Action confirmed!');
                setConfirmModalOpen(false);
              }}
            >
              Confirm
            </Button>
          </XStack>
        }
      >
        <YStack alignItems="center" space="$md" padding="$md">
          <AlertTriangle size="$2xl" color="$warning" />
          <Text textAlign="center">
            Are you sure you want to perform this action?
            This cannot be undone.
          </Text>
        </YStack>
      </Modal>

      {/* Full Content Modal Example */}
      <Modal
        open={fullModalOpen}
        onClose={() => setFullModalOpen(false)}
        title="Full Content Modal"
        size="large"
      >
        <YStack space="$md">
          <Text fontSize="$lg" fontWeight="bold">
            This is a larger modal with scrollable content
          </Text>

          <Text>
            This modal demonstrates how to display more complex content
            and allows for scrolling when the content exceeds the modal height.
          </Text>

          {/* Example content to demonstrate scrolling */}
          {Array.from({ length: 10 }).map((_, index) => (
            <YStack key={index} padding="$md" backgroundColor="$secondary" borderRadius="$md">
              <Text fontWeight="bold">Section {index + 1}</Text>
              <Text>
                This is example content that will enable scrolling in the modal.
                You can place any type of content here, including forms, lists,
                images, etc.
              </Text>
            </YStack>
          ))}

          <Button onPress={() => setFullModalOpen(false)}>
            Close Modal
          </Button>
        </YStack>
      </Modal>
    </YStack>
  );
};

export default ModalExample;
