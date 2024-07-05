import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  AspectRatio,
} from "@chakra-ui/react";
export const LocationModal = ({
  onClose,
  isOpen,
  latitude,
  longitude,
  title,
}) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AspectRatio ratio={16 / 9}>
            <iframe
              style={{ border: 0, width: "100%" }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`}
            ></iframe>
          </AspectRatio>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            اغلاق
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
