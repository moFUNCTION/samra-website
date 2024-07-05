import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Select,
  Input,
} from "@chakra-ui/react";
import { ErrorText } from "../ErrorText/ErrorText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";

export const PhoneProviderModal = ({ onClose, isOpen, onSubmit }) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      size="xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>الرجاء اكمال التالي</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Input
              isInvalid={errors.phoneNumber}
              {...register("phoneNumber", {
                valueAsNumber: true,
              })}
              type="number"
              placeholder="رقم الهاتف"
              _placeholder={{ color: errors.phoneNumber && "red.600" }}
            />
            <ErrorText errors={errors} path="phoneNumber" ml="auto" mt="10px" />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="orange" ml={3} onClick={handleSubmit(onSubmit)}>
            تأكيد
          </Button>
          <Button onClick={onClose} colorScheme="red" variant="outline">
            الغاء
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
