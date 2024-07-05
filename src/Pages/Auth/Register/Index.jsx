import React from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BiPhone } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { ErrorText } from "../../../Components/Common/ErrorText/ErrorText";
import { PhoneProviderModal } from "../../../Components/Common/PhoneProvider/PhoneProvideModal";
import { GoogleRegisteration } from "../../../@Firebase/Utils/Auth/Registeration/RegisterWithProvider/RegisterWithProvider";
import { Email_Registeration } from "../../../@Firebase/Utils/Auth/Registeration/RegisterWithEmail/RegisterWithEmail";
import { UseUserData } from "../../../Context/UserDataProvider/UserDataProvider";
import { getFirebaseErrorMessageInArabic } from "../../../@Firebase/lib/ErrorTranslatorToArabic/ErrorTranslatorToArabic";
import { CenteredCircularProgress } from "../../../Components/Common/CenteredCircularProgress/CenteredCircularProgress";
export default function Index() {
  const { user, HandleRender } = UseUserData();
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const onSubmitWithEmail = async (data) => {
    try {
      const registeration = new Email_Registeration(data);
      const req = await registeration.createUserRequiest();
      HandleRender();
    } catch (err) {
      const message = getFirebaseErrorMessageInArabic(err.message);
      toast({
        title: message,
        status: "error",
      });
    }
  };
  const {
    isOpen: isPhoneProviderModalOpened,
    onOpen: onOpenPhoneProviderModal,
    onClose: onClosePhoneProviderModal,
  } = useDisclosure();
  const onSubmitWithProvider = async (data) => {
    try {
      const google_regsiter = new GoogleRegisteration(data);
      const req = await google_regsiter.SignToProviderRequist();
      onClosePhoneProviderModal();
      HandleRender();
    } catch (err) {
      toast({
        title: err.message,
        description: "الرجاء المحاولة لاحقا او محادثة الدعم",
        status: "error",
      });
    }
  };
  if (user.loading) {
    return <CenteredCircularProgress />;
  }
  if (user.data) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <PhoneProviderModal
        isOpen={isPhoneProviderModalOpened}
        onClose={onClosePhoneProviderModal}
        onSubmit={onSubmitWithProvider}
      />
      <Stack
        justifyContent="center"
        alignItems="center"
        bgColor="orange.600"
        minH="calc(100vh - 97px)"
        p="2"
      >
        <Stack
          p="3"
          alignItems="center"
          w="100%"
          maxW="700px"
          bgColor="white"
          borderRadius="lg"
          gap="4"
        >
          <Heading
            size="md"
            borderBottom="2px"
            borderBottomColor="orange.600"
            color="orange.600"
            p="3"
            textAlign="center"
            lineHeight="9"
          >
            ❣️ سجل معانا عشان يوصلك كل العروض ❣️
          </Heading>
          <Input
            isInvalid={errors.email}
            {...register("email")}
            placeholder="@ البريد الالكتروني"
            _placeholder={{ color: errors.email && "red.600" }}
          />
          <ErrorText errors={errors} path="email" ml="auto" />
          <Input
            isInvalid={errors.username}
            {...register("username")}
            placeholder="# اسمك يكبير"
            _placeholder={{ color: errors.username && "red.600" }}
          />
          <ErrorText errors={errors} path="username" ml="auto" />
          <Input
            isInvalid={errors.password}
            _placeholder={{ color: errors.password && "red.600" }}
            {...register("password")}
            placeholder="الرقم السري"
          />
          <ErrorText errors={errors} path="password" ml="auto" />

          <Input
            isInvalid={errors.confirmPassword}
            _placeholder={{ color: errors.confirmPassword && "red.600" }}
            {...register("confirmPassword")}
            placeholder="نأكيد الرقم السري "
          />
          <ErrorText errors={errors} path="confirmPassword" ml="auto" />
          <InputGroup>
            <Input
              isInvalid={errors.phoneNumber}
              {...register("phoneNumber", {
                valueAsNumber: true,
              })}
              placeholder="رقم الهاتف"
              _placeholder={{ color: errors.phoneNumber && "red.600" }}
              type="number"
            />
            <InputRightAddon>
              <BiPhone />
            </InputRightAddon>
          </InputGroup>
          <ErrorText errors={errors} path="phoneNumber" ml="auto" />

          <Button
            whiteSpace="wrap"
            as={Link}
            variant="link"
            w="100%"
            justifyContent="start"
            to="/login"
          >
            عندك حساب دوس هنا لتسجيل الدخول
          </Button>

          <Button
            isLoading={isSubmitting}
            onClick={handleSubmit(onSubmitWithEmail)}
            colorScheme="orange"
            w="100%"
          >
            انشاء حساب
          </Button>
          <Button
            gap="2"
            alignItems="center"
            w="100%"
            colorScheme="blue"
            variant="outline"
            onClick={onOpenPhoneProviderModal}
          >
            انشاء حساب بواسطة جوجل <FcGoogle />
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
